import { merge } from 'lodash'
import config from './config.json'

const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = merge(defaultConfig, environmentConfig);

// global variables referenced via global. syntax
global.gConfig = finalConfig;

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

console.log(`global.gConfig: ${JSON.stringify(global.gConfig)}`);
