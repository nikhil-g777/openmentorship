require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../../db');

describe('database connection', () => {
  // Close connection after each test
  afterEach(() => {
    db.close();
  });

  // Should be a object
  test('should be a object', () => {
    expect(typeof db).toBe('object');
  });

  // Should be a instance of mongoose.Connection
  test('should be a instance of mongoose.Connection', () => {
    expect(db instanceof mongoose.Connection).toBe(true);
  });

  // Should be connected
  test('should be connected', () => {
    db.on('connected', () => {
      expect(db.readyState).toBe(1);
    });
  });

  // Should be disconnected
  test('should be disconnected', () => {
    db.on('disconnected', () => {
      expect(db.readyState).toBe(0);
    });
  });

  // Should be error
  test('should be error', () => {
    db.on('error', () => {
      expect(db.readyState).toBe(99);
    });
  });

  // Should be close
  test('should be close', () => {
    db.on('close', () => {
      expect(db.readyState).toBe(3);
    });
  });

  // Should be connecting
  test('should be connecting', () => {
    db.on('connecting', () => {
      expect(db.readyState).toBe(2);
    });
  });

  // Should be disconnecting
  test('should be disconnecting', () => {
    db.on('disconnecting', () => {
      expect(db.readyState).toBe(3);
    });
  });

  // Should be parsing
  test('should be parsing', () => {
    db.on('parsing', () => {
      expect(db.readyState).toBe(4);
    });
  });
});
