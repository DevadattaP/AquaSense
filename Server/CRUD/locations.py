from UTILS.dataop import *

def get_zones():
    return execute_select("SELECT ZoneId, Name FROM Zones;")


def get_zone_from_name(name):
    query = f"""
    SELECT ZoneID
    FROM Zones
    WHERE Name = '{name}';
    """
    return execute_select(query)


def get_wards(zone_id: str):
    return execute_select(f"SELECT WardID, Name FROM Ward WHERE ZoneID = '{zone_id}';")


def get_wards_from_zone_name(zone_name: str):
    try:
        zone_id = get_zone_from_name(zone_name)['response'][0]['ZoneID']
        return get_wards(zone_id)
    except Exception as e:
        return {
            "status": 'error',
            "response": "Zone not found"
        }


def get_ward_from_id(ward_id: str):

    query = f"""
    SELECT Ward.Name as Ward, Zones.Name as Zone
    FROM Ward, Zones 
    WHERE Ward.ZoneID = Zones.ZoneID AND Ward.WardID = '{ward_id}';
    """

    return execute_select(query)


if __name__ == "__main__":
    print(get_ward_from_id("W048"))