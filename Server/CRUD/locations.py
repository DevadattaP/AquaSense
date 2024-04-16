from UTILS.dataop import *

def get_zones():
    return execute_select("SELECT ZoneId, Name FROM Zones;")


def get_wards(zone_id: str):
    return execute_select(f"SELECT WardID, Name FROM Ward WHERE ZoneID = '{zone_id}';")


def get_ward_from_id(ward_id: str):

    query = f"""
    SELECT Ward.Name as Ward, Zones.Name as Zone
    FROM Ward, Zones 
    WHERE Ward.ZoneID = Zones.ZoneID AND Ward.WardID = '{ward_id}';
    """

    return execute_select(query)


if __name__ == "__main__":
    print(get_ward_from_id("W048"))