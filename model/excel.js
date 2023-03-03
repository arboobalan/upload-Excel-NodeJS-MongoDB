const mongoose = require("mongoose");

const excelSchema = new mongoose.Schema({
  
    path: {
        type: Object,
        required: true
    }
});

const excelModel = mongoose.model('fileUpload', excelSchema, 'fileUpload');
module.exports = excelModel;