from math import sin, cos, asin, radians, sqrt

from UTILS.dataop import *

def nearest_location(lat, long):

    def haversine(lat1, long1, lat2, long2):
        lat1 = radians(lat1)
        lat2 = radians(lat2)
        long1 = radians(long1)
        long2 = radians(long2)
        dphi = abs(lat1 - lat2)
        dlambda = abs(long1 - long2)
        dist = 2*6371*asin(sqrt((sin(dphi/2)**2) + (cos(lat1)*cos(lat2)*sin(dlambda/2))))
        return dist
    
    def least_dist(location):
        # location = location['response']
        return haversine(lat, long, location['latitude'], location['longitude'])

    zones = execute_select("SELECT ZoneID, ST_Y(center) as latitude, ST_X(center) as longitude FROM Zones")['response']
    print(zones)
    zone_id = min(zones, key=least_dist)['zoneid']
    print(zone_id)
    locs = execute_select(f"SELECT WardID, ST_Y(center) as latitude, ST_X(center) as longitude FROM Ward WHERE ZoneID='{zone_id}'")['response']
    print(locs)
    loc = min(locs, key=least_dist)
    print(loc)
    return loc
