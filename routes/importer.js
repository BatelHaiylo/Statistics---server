const router = require('express').Router();
const { getImporters, getImporterByImporterCode, addImporter, updateImporter, deleteImporter } = require('../controllers/importer');

router.get('/',getImporters)
router.get('/:importedCode',getImporterByImporterCode)
router.post('/add',addImporter)
router.put('/update/:id',updateImporter)
router.delete('/delete/:id',deleteImporter)

module.exports = router;