const config = require('rc')('midimaster', {
  mongo: {
    clientUrl: 'mongodb://localhost:27021',
    dbName: 'midimaster'
  }
});

config.get = function get(prop: string | string[], configPart: any = config): any {
  if (typeof prop === 'string')
    prop = prop.split('.');

  const nextConfigLevelProp = prop.shift();
  if (!nextConfigLevelProp) return configPart;
  if (!Object.prototype.hasOwnProperty.call(configPart, nextConfigLevelProp)) return null;
  const nextConfigLevel = configPart[nextConfigLevelProp];
  return get(prop, nextConfigLevel);
}

export default config;

