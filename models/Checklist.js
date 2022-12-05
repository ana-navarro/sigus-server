const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema(
  {
    idInstallationNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'installations',
      required: true,
    },
    checklistOne: {
      labeling: {
        la_absent: { type: Boolean, default: false, required: true },
        la_absent_desc: { type: String, maxLenght: 60, default: null },
        la_absent_sp: { type: String, maxLenght: 60, default: null },
        la_incorrectfixing: { type: Boolean, default: false, required: true },
        la_incorrectfixing_desc: { type: String, maxLenght: 60, default: null },
        la_incorrectfixing_sp: { type: String, maxLenght: 60, default: null },
        la_lackOfInformation: { type: Boolean, default: false, required: true },
        la_lackOfInformation_desc: {
          type: String,
          maxLenght: 60,
          default: null,
        },
        la_lackOfInformation_sp: { type: String, maxLenght: 60, default: null },
      },
      backsheet: {
        ba_delamination: { type: Boolean, default: false, required: true },
        ba_delamination_desc: { type: String, maxLenght: 60, default: null },
        ba_delamination_sp: { type: String, maxLenght: 60, default: null },
      },
      junction_box: {
        ju_electConFailure: { type: Boolean, default: false, required: true },
        ju_electConFailure_desc: { type: String, maxLenght: 60, default: null },
        ju_electConFailure_sp: { type: String, maxLenght: 60, default: null },
        ju_brokenPieces: { type: Boolean, default: false, required: true },
        ju_brokenPieces_desc: { type: String, maxLenght: 60, default: null },
        ju_brokenPieces_sp: { type: String, maxLenght: 60, default: null },
        ju_sealingFailure: { type: Boolean, default: false, required: true },
        ju_sealingFailure_desc: { type: String, maxLenght: 60, default: null },
        ju_sealingFailure_sp: { type: String, maxLenght: 60, default: null },
        ju_electricalPolarity: {
          type: Boolean,
          default: false,
          required: true,
        },
        ju_electricalPolarity_desc: {
          type: String,
          maxLenght: 60,
          default: null,
        },
        ju_electricalPolarity_sp: {
          type: String,
          maxLenght: 60,
          default: null,
        },
      },
      cabling: {
        ca_incorrectsWires: { type: Boolean, default: false, required: true },
        ca_incorrectsWires_desc: { type: String, maxLenght: 60, default: null },
        ca_incorrectsWires_sp: { type: String, maxLenght: 60, default: null },
        ca_stickerFlaws: { type: Boolean, default: false, required: true },
        ca_stickerFlaws_desc: { type: String, maxLenght: 60, default: null },
        ca_stickerFlaws_sp: { type: String, maxLenght: 60, default: null },
        ca_shortThin: { type: Boolean, default: false, required: true },
        ca_shortThin_desc: { type: String, maxLenght: 60, default: null },
        ca_shortThin_sp: { type: String, maxLenght: 60, default: null },
      },
      frame: {
        fr_damaged: { type: Boolean, default: false, required: true },
        fr_damaged_desc: { type: String, maxLenght: 60, default: null },
        fr_damaged_sp: { type: String, maxLenght: 60, default: null },
        fr_sealingFailure: { type: Boolean, default: false, required: true },
        fr_sealingFailure_desc: { type: String, maxLenght: 60, default: null },
        fr_sealingFailure_sp: { type: String, maxLenght: 60, default: null },
      },
      front_glass: {
        fo_broken: { type: Boolean, default: false, required: true },
        fo_broken_desc: { type: String, maxLenght: 60, default: null },
        fo_broken_sp: { type: String, maxLenght: 60, default: null },
        fo_scratches: { type: Boolean, default: false, required: true },
        fo_scratches_desc: { type: String, maxLenght: 60, default: null },
        fo_scratches_sp: { type: String, maxLenght: 60, default: null },
      },
      solar_cells: {
        so_delamination: { type: Boolean, default: false, required: true },
        so_delamination_desc: { type: String, maxLenght: 60, default: null },
        so_delamination_sp: { type: String, maxLenght: 60, default: null },
        so_snailTrail: { type: Boolean, default: false, required: true },
        so_snailTrail_desc: { type: String, maxLenght: 60, default: null },
        so_snailTrail_sp: { type: String, maxLenght: 60, default: null },
        so_microcracks: { type: Boolean, default: false, required: true },
        so_microcracks_desc: { type: String, maxLenght: 60, default: null },
        so_microcracks_sp: { type: String, maxLenght: 60, default: null },
        so_darkening: { type: Boolean, default: false, required: true },
        so_darkening_desc: { type: String, maxLenght: 60, default: null },
        so_darkening_sp: { type: String, maxLenght: 60, default: null },
      },
    },
    checklistTwo: {
      fence: {
        fe_absent: { type: Boolean, default: false, required: true },
        fe_absent_desc: { type: String, maxLenght: 60, default: null },
        fe_absent_sp: { type: String, maxLenght: 60, default: null },
        fe_broken: { type: Boolean, default: false, required: true },
        fe_broken_desc: { type: String, maxLenght: 60, default: null },
        fe_broken_sp: { type: String, maxLenght: 60, default: null },
        fe_loose: { type: Boolean, default: false, required: true },
        fe_loose_desc: { type: String, maxLenght: 60, default: null },
        fe_loose_sp: { type: String, maxLenght: 60, default: null },
      },
      camera: {
        cm_noImages: { type: Boolean, default: false, required: true },
        cm_noImages_desc: { type: String, maxLenght: 60, default: null },
        cm_noImages_sp: { type: String, maxLenght: 60, default: null },
      },
      ground: {
        gr_bush: { type: Boolean, default: false, required: true },
        gr_bush_desc: { type: String, maxLenght: 60, default: null },
        gr_bush_sp: { type: String, maxLenght: 60, default: null },
        gr_erosions: { type: Boolean, default: false, required: true },
        gr_erosions_desc: { type: String, maxLenght: 60, default: null },
        gr_erosions_sp: { type: String, maxLenght: 60, default: null },
        gr_holes: { type: Boolean, default: false, required: true },
        gr_holes_desc: { type: String, maxLenght: 60, default: null },
        gr_holes_sp: { type: String, maxLenght: 60, default: null },
      },
      internet: {
        in_noConnections: { type: Boolean, default: false, required: true },
        in_noConnections_desc: { type: String, maxLenght: 60, default: null },
        in_noConnections_sp: { type: String, maxLenght: 60, default: null },
      },
    },
    checklistThree: {
      inversor: {
        iv_num_serie: { type: String },
        iv_visual_inspection: { type: Boolean, default: false },
        iv_audio_inspection: { type: Boolean, default: false },
        iv_labeling_Idt: { type: Boolean, default: false },
        iv_thermographic_inspection: { type: Boolean, default: false },
        iv_eletrical_inspection: { type: Boolean, default: false },
        iv_alarm: { type: Boolean, default: false },
        iv_events: { type: Boolean, default: false },
        iv_grounding: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
  },
);

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = { Checklist };
