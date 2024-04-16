import psycopg2 as pg

DB_HOST = 'localhost'
DB_PORT = 5432
DB_NAME = 'AquaSense'
DB_USER = 'postgres'
DB_PASSWORD = 'admin'

def get_connection():
    return pg.connect(user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME, host=DB_HOST, port=DB_PORT)

def execute_query(query, message="query successful", values=None):
    try:
        with get_connection() as connection:
            cursor = connection.cursor()
            if values:
                cursor.execute(query, values)
            else:
                cursor.execute(query)
            connection.commit()
        return {
            'status':'success',
            'response': message
        }

    except Exception as e:
        return {
            'status':'error',
            'response': str(e)
        }


def execute_select(query, values=None, make_list=False):
    try:
        with get_connection() as connection:
            cursor = connection.cursor()
            if values:
                cursor.execute(query, values)
            else:
                cursor.execute(query)
            rows = cursor.fetchall()
            
            if not rows:
                response = None
            if len(rows) == 1 and not make_list:
                response = {cursor.description[i][0]:value for i, value in enumerate(rows[0])}
            else:
                response = [{cursor.description[i][0]:value for i, value in enumerate(row)} for row in rows]

        return {
                'status':'success',
                'response': response
            }
    
    except Exception as e:
        return {
            'status':'error',
            'response': str(e)
        }
