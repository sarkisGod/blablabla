'use strict';

const simianComponent = require('../component/simian');
const DnaModel = require('../model/dnaResearch');
const { compareMatrices } = require('../helper/utils/utils');


const isSimian = async (req, res) => {
    const { dna } = req.body;

    const result = simianComponent.checkSimianCombinations(dna);
    const allDnaResearched = await DnaModel.getAll();

    const alreadyExist = allDnaResearched.some(({ dna: dnaSaved }) => compareMatrices(dnaSaved, dna));

    if(!alreadyExist) await DnaModel.insert({dna, isSimian: result});

    return result ? res.status(200).json({response: 'Simian detected'}) :
        res.status(403).json({response: 'Human dna not allowed'})
}

const stats = async (req, res) => {
    const allDnaResearched = await DnaModel.getAll();

    return res.json(simianComponent.getStats(allDnaResearched));
}

module.exports = {
    isSimian,
    stats
}