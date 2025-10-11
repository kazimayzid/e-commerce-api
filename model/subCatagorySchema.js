const mongoose = require("mongoose");
const {Schema} = mongoose;

const subCategorySchema = new Schema ({
     name: {
        type: String,
        trim: true,
        required: true,
     },
     description : {
        type: String,
     },
     category: {
        type: Schema.Types.ObjectId,
        ref: "catagoriesList",
        required: true
     }
})

module.exports = mongoose.model("subCatagoriesList", subCategorySchema)