from .__init__ import BASE_DIR, DBLOCATION, db_var

import csv

def data():
    with open(f'{BASE_DIR}\lib_data.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        fields = next(reader)
        
        return fields

def create_table_library():
    db = db_var()
    fields = data()
    print(fields)
    for field in fields:
        print(field)
        db.execute(f'''
        ALTER TABLE library ADD COLUMN {field};
        ''')

