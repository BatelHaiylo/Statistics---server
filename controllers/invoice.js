const InvoiceModal = require("../modals/invoice");

const getInvoices = async (req, res) => {
  await InvoiceModal.find({}).populate("user").populate("product")
    .then((invoices) => {
      invoices.length == 0
        ? res.status(300).json({ success: false, message: "no invoices was found" })
        : res.status(200).json({ success: true, invoices });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
};

const getInvoiceById = async (req, res) => {
  await InvoiceModal.findById(req.params.id)
    .then((invoice) => {
      return !invoice
        ? res.status(200).json({ successes: true }, invoice)
        : res.status(300).json({ successes: false, msg: "no invoice found" });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const addNewInvoice = async (req, res) => {
  await InvoiceModal.create(req.body.Invoice)
    .then((invoice) => {
      return res.status(200).json({ successes: true, invoice });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};
const addInvoice = async (req, res) => {
  await InvoiceModal.insertMany(req.body.Invoice)
    .then((invoice) => {
      return res.status(200).json({ successes: true, invoice });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const updateInvoice = async (req, res) => {
  await InvoiceModal.findByIdAndUpdate(req.params.id, req.body.Invoice)
    .then((invoice) => {
      return res.status(200).json({ successes: true, invoice });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const deleteInvoice = async (req, res) => {
  await InvoiceModal.findByIdAndRemove(req.params.id, req.body.Invoice)
    .then((invoice) => {
      return res.status(200).json({ successes: true, invoice });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

module.exports = { getInvoices, getInvoiceById, addInvoice, updateInvoice, deleteInvoice };