-- create trigger for pipeflow updation
CREATE OR REPLACE FUNCTION update_pipeflow()
RETURNS TRIGGER AS $$
BEGIN
    -- Update PipeFlow table based on the inserted data
    UPDATE PipeFlow
    SET Flow = NEW.Flow,
        Pressure = NEW.Pressure,
		Last_Updated = NEW.time_stamp
    WHERE PipelineID = NEW.PipelineID;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_pipeflow_trigger ON PipeFlowLog;
CREATE TRIGGER update_pipeflow_trigger
AFTER INSERT ON PipeFlowLog
FOR EACH ROW
EXECUTE FUNCTION update_pipeflow();




-- create trigger to make the flow and pressure of all children pipes 0 when status of a pipe is made false
CREATE OR REPLACE FUNCTION update_child_pipeflowlog()
RETURNS TRIGGER AS $$
BEGIN
    -- Recursive query to select the direct and indirect children of the updated pipeline
    WITH RECURSIVE PipeHierarchy AS (
        -- Anchor member: Select the updated pipeline
        SELECT NEW.PipelineID

        UNION ALL

	-- Anchor member: Select the direct children
        SELECT PipelineID
        FROM Pipelines
        WHERE Parent = NEW.PipelineID

        UNION ALL

        -- Recursive member: Select the children of the current level and their children recursively
        SELECT P.PipelineID
        FROM Pipelines P
        INNER JOIN PipeHierarchy PH ON P.Parent = PH.PipelineID
    )
    -- Insert new rows into the pipeflowlog table for the selected pipelines
    INSERT INTO pipeflowlog (pipelineid, time_stamp, flow, pressure)
    SELECT PipelineID, NOW(), 0, 0
    FROM PipeHierarchy;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_child_pipeflowlog_trigger ON pipelines;
CREATE TRIGGER update_child_pipeflowlog_trigger
AFTER UPDATE OF status ON pipelines
FOR EACH ROW
WHEN (NEW.status = false)
EXECUTE FUNCTION update_child_pipeflowlog();



-- creat trigger to update flow, pressure if a pipe is turned on
CREATE OR REPLACE FUNCTION update_pipeflowlog()
RETURNS TRIGGER AS $$
DECLARE
    parent_flow DECIMAL;
    parent_pressure DECIMAL;
BEGIN
    -- Calculate the flow and pressure for the parent pipeline
    SELECT flow, pressure INTO parent_flow, parent_pressure
    FROM pipeflowlog
    WHERE pipelineid = NEW.Parent;

    -- Ensure the parent flow and pressure are not negative
    parent_flow := GREATEST(parent_flow - 0.08, 0);
    parent_pressure := GREATEST(parent_pressure - 0.5, 0);

    -- Insert flow and pressure values into the pipeflowlog table for the parent pipeline
    INSERT INTO pipeflowlog (pipelineid, time_stamp, flow, pressure)
    VALUES (NEW.pipelineid, NOW(), parent_flow, parent_pressure);

    -- Recursive query to select the direct and indirect children of the updated pipeline
    WITH RECURSIVE PipeHierarchy AS (
        -- Anchor member: Select the updated pipeline and its direct children
        SELECT PipelineID
        FROM Pipelines
        WHERE Parent = NEW.PipelineID

        UNION ALL

        -- Recursive member: Select the children of the current level
        SELECT P.PipelineID
        FROM Pipelines P
        INNER JOIN PipeHierarchy PH ON P.Parent = PH.PipelineID
    )
    -- Insert flow and pressure values into the pipeflowlog table for the selected pipelines
    INSERT INTO pipeflowlog (pipelineid, time_stamp, flow, pressure)
    SELECT PH.PipelineID, NOW(), GREATEST(parent_flow - 0.08, 0), GREATEST(parent_pressure - 0.5, 0)
    FROM PipeHierarchy AS PH;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_pipeflowlog_trigger ON pipelines;
CREATE TRIGGER update_pipeflowlog_trigger
AFTER UPDATE OF status ON Pipelines
FOR EACH ROW
WHEN (NEW.status = true)
EXECUTE FUNCTION update_pipeflowlog();




DELETE FROM pipeflowlog;
-- add flow & pressure of each pipe
WITH RECURSIVE PipeHierarchy AS (
    -- Anchor member: Select the source pipes and their direct children
    SELECT PipelineID, 20.0 AS flow, 80.0 AS pressure
    FROM Pipelines
    WHERE Parent = 'source'

    UNION ALL

    -- Recursive member: Select the children of the current level and adjust pressure and flow values
    SELECT P.PipelineID, GREATEST(PH.flow - 0.08,0), GREATEST(PH.pressure - 0.5,0)
    FROM Pipelines P
    INNER JOIN PipeHierarchy PH ON P.Parent = PH.PipelineID
)
-- Insert rows into pipeflowlog for each pipe in the hierarchy
INSERT INTO pipeflowlog (pipelineid, time_stamp, flow, pressure)
SELECT PipelineID, NOW(), flow, pressure
FROM PipeHierarchy;
