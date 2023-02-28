const ImporterModal = require("../modals/importer");

const getImporters = async (req, res) => {
  await ImporterModal.find({})
    .then((importer) => {
      importer.length == 0
        ? res.status(300).json({ success: false, message: "no importer was found" })
        : res.status(200).json({ success: true, importer });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
};

const getImporterByImporterCode = async (req, res) => {
  await ImporterModal.find(req.paramsCode)
    .then((importer) => {
      return !importer
        ? res.status(200).json({ successes: true }, importer)
        : res.status(300).json({ successes: false, msg: "no importer found" });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const addNewImporter = async (req, res) => {
  await ImporterModal.create(req.body)
    .then((importer) => {
      return res.status(200).json({ successes: true, importer });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};
const addImporter = async (req, res) => {
  await ImporterModal.insertMany(req.body)
    .then((importer) => {
      return res.status(200).json({ successes: true, importer });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const updateImporter = async (req, res) => {
  await ImporterModal.findByIdAndUpdate(req.params.id, req.body)
    .then((importer) => {
      return res.status(200).json({ successes: true, importer });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const deleteImporter = async (req, res) => {
  await ImporterModal.findByIdAndRemove(req.params.id, req.body)
    .then((importer) => {
      return res.status(200).json({ successes: true, importer });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

module.exports = { getImporters, getImporterByImporterCode, addImporter, updateImporter, deleteImporter };