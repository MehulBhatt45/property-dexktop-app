// const baseApiUrl = "http://132.140.160.60:4000";
// const baseMediaUrl = "http://132.140.160.60/rojkind/server/uploads/";

const { app } = require('electron').remote
const path = require('path');

const baseApiUrl = "http://ec2-18-218-26-118.us-east-2.compute.amazonaws.com:4000";
const uploadPath = app.getPath('pictures')+'/propertyDesktopApp/property/'
const baseMediaUrl = "file:"+path.resolve(app.getPath('pictures'))+'/propertyDesktopApp/property/'//"https://s3.us-west-1.amazonaws.com/assets.rojkind.com.mx/"//app.getPath('Pictures');
export const config = {
    baseApiUrl: baseApiUrl,
    uploadpath: uploadPath,
    baseMediaUrl: baseMediaUrl
};