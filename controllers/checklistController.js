const { Checklist } = require('../models/Checklist');
const CheckImages = require('../models/ChecklistImages');

const createChecklist = async (req, res) => {
  try {
    const id = req.params.id;
    const newChecklist = new Checklist({
      idInstallationNumber: id,

      la_absent: req.body.la_absent,
      la_absent_desc: req.body.la_absent_desc,
      la_absent_sp: req.body.la_absent_sp,

      la_incorrectfixing: req.body.la_incorrectfixing,
      la_incorrectfixing_desc: req.body.la_incorrectfixing_desc,
      la_incorrectfixing_sp: req.body.la_incorrectfixing_sp,

      la_lackOfInformation: req.body.la_lackOfInformation,
      la_lackOfInformation_desc: req.body.la_lackOfInformation_desc,
      la_lackOfInformation_sp: req.body.la_lackOfInformation_sp,

      ba_delamination: req.body.ba_delamination,
      ba_delamination_desc: req.body.ba_delamination_desc,
      ba_delamination_sp: req.body.ba_delamination_sp,

      ju_electConFailure: req.body.ju_electConFailure,
      ju_electConFailure_desc: req.body.ju_electConFailure_desc,
      ju_electConFailure_sp: req.body.ju_electConFailure_sp,

      ju_brokenPieces: req.body.ju_brokenPieces,
      ju_brokenPieces_desc: req.body.ju_brokenPieces_desc,
      ju_brokenPieces_sp: req.body.ju_brokenPieces_sp,

      ju_sealingFailure: req.body.ju_sealingFailure,
      ju_sealingFailure_desc: req.body.ju_sealingFailure_desc,
      ju_sealingFailure_sp: req.body.ju_sealingFailure_sp,

      ju_electricalPolarity: req.body.ju_electricalPolarity,
      ju_electricalPolarity_desc: req.body.ju_electricalPolarity_desc,
      ju_electricalPolarity_sp: req.body.ju_electricalPolarity_sp,

      ca_incorrectsWires: req.body.ca_incorrectsWires,
      ca_incorrectsWires_desc: req.body.ca_incorrectsWires_desc,
      ca_incorrectsWires_sp: req.body.ca_incorrectsWires_sp,

      ca_stickerFlaws: req.body.ca_stickerFlaws,
      ca_stickerFlaws_desc: req.body.ca_stickerFlaws_desc,
      ca_stickerFlaws_sp: req.body.ca_stickerFlaws_sp,

      ca_shortThin: req.body.ca_shortThin,
      ca_shortThin_desc: req.body.ca_shortThin_desc,
      ca_shortThin_sp: req.body.ca_shortThin_sp,

      fr_damaged: req.body.fr_damaged,
      fr_damaged_desc: req.body.fr_damaged_desc,
      fr_damaged_sp: req.body.fr_damaged_sp,

      fr_sealingFailure: req.body.fr_sealingFailure,
      fr_sealingFailure_desc: req.body.fr_sealingFailure_desc,
      fr_sealingFailure_sp: req.body.fr_sealingFailure_sp,

      fo_broken: req.body.fo_broken,
      fo_broken_desc: req.body.fo_broken_desc,
      fo_broken_sp: req.body.fo_broken_sp,

      fo_scratches: req.body.fo_scratches,
      fo_scratches_desc: req.body.fo_scratches_desc,
      fo_scratches_sp: req.body.fo_scratches_sp,

      so_delamination: req.body.so_delamination,
      so_delamination_desc: req.body.so_delamination_desc,
      so_delamination_sp: req.body.so_delamination_sp,

      so_snailTrail: req.body.so_snailTrail,
      so_snailTrail_desc: req.body.so_snailTrail_desc,
      so_snailTrail_sp: req.body.so_snailTrail_sp,

      so_microcracks: req.body.so_microcracks,
      so_microcracks_desc: req.body.so_microcracks_desc,
      so_microcracks_sp: req.body.so_microcracks_sp,

      so_darkening: req.body.so_darkening,
      so_darkening_desc: req.body.so_darkening_desc,
      so_darkening_sp: req.body.so_darkening_sp,

      fe_absent: req.body.fe_absent,
      fe_absent_desc: req.body.fe_absent_desc,
      fe_absent_sp: req.body.fe_absent_sp,

      fe_broken: req.body.fe_broken,
      fe_broken_desc: req.body.fe_broken_desc,
      fe_broken_sp: req.body.fe_broken_sp,

      fe_loose: req.body.fe_loose,
      fe_loose_desc: req.body.fe_loose_desc,
      fe_loose_sp: req.body.fe_loose_sp,

      cm_noImages: req.body.cm_noImages,
      cm_noImages_desc: req.body.cm_noImages_desc,
      cm_noImages_sp: req.body.cm_noImages_sp,

      gr_bush: req.body.gr_bush,
      gr_bush_desc: req.body.gr_bush_desc,
      gr_bush_sp: req.body.gr_bush_sp,

      gr_erosions: req.body.gr_erosions,
      gr_erosions_desc: req.body.gr_erosions_desc,
      gr_erosions_sp: req.body.gr_erosions_sp,

      gr_holes: req.body.gr_holes,
      gr_holes_desc: req.body.gr_holes_desc,
      gr_holes_sp: req.body.gr_holes_sp,

      in_noConnections: req.body.in_noConnections,
      in_noConnections_desc: req.body.in_noConnections_desc,
      in_noConnections_sp: req.body.in_noConnections_sp,

      iv_num_serie: req.body.iv_num_serie,
      iv_visual_inspection: req.body.iv_visual_inspection,
      iv_audio_inspection: req.body.iv_audio_inspection,
      iv_labeling_Idt: req.body.iv_labeling_Idt,
      iv_thermographic_inspection: req.body.iv_thermographic_inspection,
      iv_eletrical_inspection: req.body.iv_eletrical_inspection,
      iv_alarm: req.body.iv_alarm,
      iv_events: req.body.iv_events,
      iv_grounding: req.body.iv_grounding,
    });
    const savedChecklist = await newChecklist.save();
    res
      .status(201)
      .json({ msg: 'Checklist adicionado com sucesso!', savedChecklist });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};
const updateChecklist = async (req, res) => {
  try {
    const { idChecklist } = req.params;
    const newChecklist = await Checklist.findByIdAndUpdate(idChecklist, {
      la_absent: req.body.la_absent,
      la_absent_desc: req.body.la_absent_desc,
      la_absent_sp: req.body.la_absent_sp,

      la_incorrectfixing: req.body.la_incorrectfixing,
      la_incorrectfixing_desc: req.body.la_incorrectfixing_desc,
      la_incorrectfixing_sp: req.body.la_incorrectfixing_sp,

      la_lackOfInformation: req.body.la_lackOfInformation,
      la_lackOfInformation_desc: req.body.la_lackOfInformation_desc,
      la_lackOfInformation_sp: req.body.la_lackOfInformation_sp,

      ba_delamination: req.body.ba_delamination,
      ba_delamination_desc: req.body.ba_delamination_desc,
      ba_delamination_sp: req.body.ba_delamination_sp,

      ju_electConFailure: req.body.ju_electConFailure,
      ju_electConFailure_desc: req.body.ju_electConFailure_desc,
      ju_electConFailure_sp: req.body.ju_electConFailure_sp,

      ju_brokenPieces: req.body.ju_brokenPieces,
      ju_brokenPieces_desc: req.body.ju_brokenPieces_desc,
      ju_brokenPieces_sp: req.body.ju_brokenPieces_sp,

      ju_sealingFailure: req.body.ju_sealingFailure,
      ju_sealingFailure_desc: req.body.ju_sealingFailure_desc,
      ju_sealingFailure_sp: req.body.ju_sealingFailure_sp,

      ju_electricalPolarity: req.body.ju_electricalPolarity,
      ju_electricalPolarity_desc: req.body.ju_electricalPolarity_desc,
      ju_electricalPolarity_sp: req.body.ju_electricalPolarity_sp,

      ca_incorrectsWires: req.body.ca_incorrectsWires,
      ca_incorrectsWires_desc: req.body.ca_incorrectsWires_desc,
      ca_incorrectsWires_sp: req.body.ca_incorrectsWires_sp,

      ca_stickerFlaws: req.body.ca_stickerFlaws,
      ca_stickerFlaws_desc: req.body.ca_stickerFlaws_desc,
      ca_stickerFlaws_sp: req.body.ca_stickerFlaws_sp,

      ca_shortThin: req.body.ca_shortThin,
      ca_shortThin_desc: req.body.ca_shortThin_desc,
      ca_shortThin_sp: req.body.ca_shortThin_sp,

      fr_damaged: req.body.fr_damaged,
      fr_damaged_desc: req.body.fr_damaged_desc,
      fr_damaged_sp: req.body.fr_damaged_sp,

      fr_sealingFailure: req.body.fr_sealingFailure,
      fr_sealingFailure_desc: req.body.fr_sealingFailure_desc,
      fr_sealingFailure_sp: req.body.fr_sealingFailure_sp,

      fo_broken: req.body.fo_broken,
      fo_broken_desc: req.body.fo_broken_desc,
      fo_broken_sp: req.body.fo_broken_sp,

      fo_scratches: req.body.fo_scratches,
      fo_scratches_desc: req.body.fo_scratches_desc,
      fo_scratches_sp: req.body.fo_scratches_sp,

      so_delamination: req.body.so_delamination,
      so_delamination_desc: req.body.so_delamination_desc,
      so_delamination_sp: req.body.so_delamination_sp,

      so_snailTrail: req.body.so_snailTrail,
      so_snailTrail_desc: req.body.so_snailTrail_desc,
      so_snailTrail_sp: req.body.so_snailTrail_sp,

      so_microcracks: req.body.so_microcracks,
      so_microcracks_desc: req.body.so_microcracks_desc,
      so_microcracks_sp: req.body.so_microcracks_sp,

      so_darkening: req.body.so_darkening,
      so_darkening_desc: req.body.so_darkening_desc,
      so_darkening_sp: req.body.so_darkening_sp,

      fe_absent: req.body.fe_absent,
      fe_absent_desc: req.body.fe_absent_desc,
      fe_absent_sp: req.body.fe_absent_sp,

      fe_broken: req.body.fe_broken,
      fe_broken_desc: req.body.fe_broken_desc,
      fe_broken_sp: req.body.fe_broken_sp,

      fe_loose: req.body.fe_loose,
      fe_loose_desc: req.body.fe_loose_desc,
      fe_loose_sp: req.body.fe_loose_sp,

      cm_noImages: req.body.cm_noImages,
      cm_noImages_desc: req.body.cm_noImages_desc,
      cm_noImages_sp: req.body.cm_noImages_sp,

      gr_bush: req.body.gr_bush,
      gr_bush_desc: req.body.gr_bush_desc,
      gr_bush_sp: req.body.gr_bush_sp,

      gr_erosions: req.body.gr_erosions,
      gr_erosions_desc: req.body.gr_erosions_desc,
      gr_erosions_sp: req.body.gr_erosions_sp,

      gr_holes: req.body.gr_holes,
      gr_holes_desc: req.body.gr_holes_desc,
      gr_holes_sp: req.body.gr_holes_sp,

      in_noConnections: req.body.in_noConnections,
      in_noConnections_desc: req.body.in_noConnections_desc,
      in_noConnections_sp: req.body.in_noConnections_sp,

      iv_num_serie: req.body.iv_num_serie,
      iv_visual_inspection: req.body.iv_visual_inspection,
      iv_audio_inspection: req.body.iv_audio_inspection,
      iv_labeling_Idt: req.body.iv_labeling_Idt,
      iv_thermographic_inspection: req.body.iv_thermographic_inspection,
      iv_eletrical_inspection: req.body.iv_eletrical_inspection,
      iv_alarm: req.body.iv_alarm,
      iv_events: req.body.iv_events,
      iv_grounding: req.body.iv_grounding,
    });
    await newChecklist.save();
    res
      .status(201)
      .json({ msg: 'Checklist atualizado com sucesso!', newChecklist });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const getChecklist = async (req, res) => {
  try {
    const { idChecklist } = req.params;
    const checklist = await Checklist.findById({
      _id: idChecklist,
    });
    res.status(200).json(checklist);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const getChecklistAll = async (req, res) => {
  try {
    const id = req.params.id;
    const checklistList = await Checklist.find({
      idInstallationNumber: `${id}`,
    }).sort({ createdAt: -1 });

    res.status(200).json(checklistList);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const deleteChecklist = async (req, res) => {
  try {
    const id = req.params.id;
    const checklist = await Checklist.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Checklist deletado!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const imagesChecklist = async (req, res) => {
  try {
    const id = req.params.id;
    const { originalname: name, size, key, destination: url = '' } = req.file;
    const checklist = new CheckImages({
      idInstallationNumber: id,
      name,
      size,
      key,
      url,
    });
    const checklistSave = await checklist.save();
    res.status(200).json({ msg: 'Image has been salved!', checklistSave });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const getImages = async (req, res) => {
  try {
    const id = req.params.id;
    const checklistList = await CheckImages.find({ installationNumber: id });
    res.status(200).json(checklistList);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const deleteImagesChecklist = async (req, res) => {
  try {
    const id = req.params.id;
    const checklist = await CheckImages.findById(id);
    await checklist.remove();
    res.status(200).json({ msg: 'Image has been deleted!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

module.exports = {
  createChecklist,
  getChecklist,
  getChecklistAll,
  deleteChecklist,
  updateChecklist,
  imagesChecklist,
  getImages,
  deleteImagesChecklist,
};
