function init() {
  //When running on Bluemix, this variable will be set to a json object
  //containing all the service credentials of all the bound services
  if (process.env.VCAP_SERVICES) {
    return getCredentials(process.env.VCAP_SERVICES);
  }//When running locally, the VCAP_SERVICES will not be set

    // When running this app locally you can get your Cloudant credentials
    // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
    // Variables section for an app in the Bluemix console dashboard).
    // Once you have the credentials, paste them into a file called vcap-local.json.
    // Alternately you could point to a local database here instead of a
    // Bluemix service.
    // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
    return getCredentials(fs.readFileSync("vcap-local.json", "utf-8"));
}

function getCustomCredentials(obj) {
  let results = {};
  for(let service of obj) {
    if(service.name.match(/twilio/i)) {
      results.twilio = service.credentials;
    }
  }
  return results;
}

function getCredentials(jsonData) {
  let vcapServices = JSON.parse(jsonData);
  let results = {};
  // Pattern match to find the first instance of a Cloudant service in
  // VCAP_SERVICES. If you know your service key, you can access the
  // service credentials directly by using the vcapServices object.
  for (let vcapService in vcapServices) {
    var services = vcapServices[vcapService];
    if (vcapService.match(/user-provided/i)) {
      //results = [...results, ...getCustomCredentials(services)];
      results = Object.assign(results, getCustomCredentials(services));
      continue;
    }
    results[vcapService] = services[0].credentials;
  }
  return results;
}

module.exports = init();
