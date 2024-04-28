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

CREATE TRIGGER update_child_pipeflowlog_trigger
AFTER UPDATE OF status ON pipelines
FOR EACH ROW
EXECUTE FUNCTION update_child_pipeflowlog();
