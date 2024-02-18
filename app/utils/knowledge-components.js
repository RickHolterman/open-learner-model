import { RULES, RULE_NAMES } from './rules';

const KNOWLEDGE_COMPONENTS = [
  {
    title: RULE_NAMES.ASSOCIATIVITY,
    rules: RULES.ASSOCIATIVITY,
  },
  {
    title: RULE_NAMES.ABSORPTION,
    rules: RULES.ABSORPTION,
  },
  {
    title: RULE_NAMES.COMMUTATIVITY,
    rules: RULES.COMMUTATIVITY,
  },
  {
    title: RULE_NAMES.DE_MORGAN,
    rules: RULES.DE_MORGAN,
  },
  {
    title: RULE_NAMES.DISTRIBUTION,
    rules: RULES.DISTRIBUTION,
  },
  {
    title: RULE_NAMES.DOUBLE_NEGATION,
    rules: RULES.DOUBLE_NEGATION,
  },
  {
    title: RULE_NAMES.EQUIVALENCE_DEFINITION,
    rules: RULES.EQUIVALENCE_DEFINITION,
  },
  {
    title: RULE_NAMES.F_RULES,
    description:
      'The F-rules include: F-rule complement, F-rule conjunction, F-rule disjunction, and F-rule not T.',
    rules: [
      ...RULES.F_RULE_COMPLEMENT,
      ...RULES.F_RULE_CONJUNCTION,
      ...RULES.F_RULE_DISJUNCTION,
      ...RULES.F_RULE_NOT_T,
    ],
  },
  {
    title: RULE_NAMES.IDEMPOTENCY,
    rules: RULES.IDEMPOTENCY,
  },
  {
    title: RULE_NAMES.IMPLICATION_DEFINITION,
    rules: RULES.IMPLICATION_DEFINITION,
  },
  {
    title: RULE_NAMES.T_RULES,
    description:
      'The T-rules include: T-rule complement, T-rule conjunction, T-rule disjunction, and T-rule not F.',
    rules: [
      ...RULES.T_RULE_COMPLEMENT,
      ...RULES.T_RULE_CONJUNCTION,
      ...RULES.T_RULE_DISJUNCTION,
      ...RULES.T_RULE_NOT_F,
    ],
  },
];

export { KNOWLEDGE_COMPONENTS };
