const RULES = {
  ASSOCIATIVITY: ['logic.propositional.assoc'],
  ABSORPTION: [
    'logic.propositional.absorption',
    'logic.propositional.absorpor',
    'logic.propositional.absorpor-subset-com',
  ],
  COMMUTATIVITY: ['logic.propositional.commutativity'],
  DE_MORGAN: [
    'logic.propositional.demorgan',
    'logic.propositional.demorganand',
    'logic.propositional.demorganor',
    'logic.propositional.buggy.demorgan1',
    'logic.propositional.buggy.demorgan4',
  ],
  DISTRIBUTION: [
    'logic.propositional.distribution',
    'logic.propositional.andoveror',
  ],
  DOUBLE_NEGATION: [
    'logic.propositional.doublenegation',
    'logic.propositional.notnot',
  ],
  EQUIVALENCE_DEFINITION: [
    'logic.propositional.equivalence',
    'logic.propositional.defequiv',
  ],
  F_RULE_COMPLEMENT: [
    'logic.propositional.falsecomplement',
    'logic.propositional.compland',
  ],
  F_RULE_CONJUNCTION: [
    'logic.propositional.falseconjunction',
    'logic.propositional.falsezeroand',
  ],
  F_RULE_DISJUNCTION: [
    'logic.propositional.falsedisjunction',
    'logic.propositional.falsezeroor',
  ],
  F_RULE_NOT_T: ['logic.propositional.nottrue'],
  IDEMPOTENCY: ['logic.propositional.idempotency'],
  IMPLICATION_DEFINITION: [
    'logic.propositional.implication',
    'logic.propositional.defimpl',
  ],
  T_RULE_COMPLEMENT: ['logic.propositional.truecomplement'],
  T_RULE_CONJUNCTION: ['logic.propositional.trueconjunction'],
  T_RULE_DISJUNCTION: ['logic.propositional.truedisjunction'],
  T_RULE_NOT_F: ['logic.propositional.notfalse'],
};

export { RULES };
