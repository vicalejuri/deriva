/*
 * Pouchdb Online/offline
 */
export const REMOTEDB_READY = 'REMOTEDB_READY';
export function remotedbReady( db ){
  return {type: REMOTEDB_READY, db };
}

export const REMOTEDB_PULL = 'REMOTEDB_PULL';
export const REMOTEDB_PULL_SUCCESS = 'REMOTEDB_PULL_SUCCESS';
export const REMOTEDB_PULL_ERROR = 'REMOTEDB_PULL_ERROR';

export const REMOTEDB_PUSH = 'REMOTEDB_PUSH';
export const REMOTEDB_PUSH_SUCCESS = 'REMOTEDB_PUSH_SUCCESS'
export const REMOTEDB_PUSH_ERROR = 'REMOTEDB_PUSH_ERROR'

export const SET_SYNC_STATE = 'SET_SYNC_STATE';
