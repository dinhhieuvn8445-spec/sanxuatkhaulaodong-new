#!/usr/bin/env python3
"""
Script to create customer_registrations table for storing customer registration data
"""

import sqlite3
import os

def create_customer_registrations_table():
    """Create customer_registrations table in the database"""
    
    # Connect to database
    db_path = 'admin_content.db'
    if not os.path.exists(db_path):
        print(f"Database {db_path} not found!")
        return False
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Create customer_registrations table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS customer_registrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                age TEXT NOT NULL,
                gender TEXT NOT NULL,
                province TEXT NOT NULL,
                country TEXT,
                industry TEXT,
                experience TEXT,
                notes TEXT,
                form_type TEXT NOT NULL DEFAULT 'consultation',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create index for better performance
        cursor.execute('''
            CREATE INDEX IF NOT EXISTS idx_customer_phone ON customer_registrations(phone)
        ''')
        
        cursor.execute('''
            CREATE INDEX IF NOT EXISTS idx_customer_created_at ON customer_registrations(created_at)
        ''')
        
        conn.commit()
        print("✅ Customer registrations table created successfully!")
        
        # Verify table creation
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='customer_registrations'")
        if cursor.fetchone():
            print("✅ Table verification successful!")
            
            # Show table structure
            cursor.execute("PRAGMA table_info(customer_registrations)")
            columns = cursor.fetchall()
            print("\n📋 Table structure:")
            for col in columns:
                print(f"  - {col[1]} ({col[2]})")
        else:
            print("❌ Table verification failed!")
            return False
            
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error creating table: {e}")
        return False

if __name__ == "__main__":
    create_customer_registrations_table()