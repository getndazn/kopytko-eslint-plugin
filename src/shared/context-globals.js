
const globals = [
  'invalid',
  'm',
  'lcase',
  'ucase',
  'getInterface',
  'createObject',
  'eval',
  'run',
  'getLastRunCompileError',
  'getLastRuntimeError',
  'type',
  'getGlobalAA',
  'box',
  "Sleep",
  "Wait",
  "GetInterface",
  "FindMemberFunction",
  "UpTime",
  "RebootSystem",
  "ListDir",
  "ReadAsciiFile",
  "WriteAsciiFile",
  "CopyFile",
  "MoveFile",
  "MatchFiles",
  "DeleteFile",
  "DeleteDirectory",
  "CreateDirectory",
  "FormatDrive",
  "StrToI",
  "RunGarbageCollector",
  "ParseJson",
  "FormatJson",
  "Tr",
  "UCase",
  "LCase",
  "Asc",
  "Chr",
  "Instr",
  "Left",
  "Len",
  "Mid",
  "Right",
  "Str",
  "StrI",
  "StrI",
  "String",
  "StringI",
  "Val",
  "Val",
  "Substitute",
  "Abs",
  "Atn",
  "Cdbl",
  "Cint",
  "Cos",
  "Csng",
  "Exp",
  "Fix",
  "Int",
  "Log",
  "Rnd",
  "Rnd",
  "Sgn",
  "Sgn",
  "Sin",
  "Sqr",
  "Tan",
  "tab"
]

function isInForEach(node, key) {
  while (node.parent) {
    if (node.parent.type === 'ForEachStatement' && node.parent.counter.name === key) {
      return true
    } else {
      return isInForEach(node.parent, key)
    }
  }
  return false
}

function isInForLoop(node, key) {
  while (node.parent) {
    if (node.parent.type === 'ForStatement') {
      if (node.parent.counter && node.parent.counter.name === key) {
        return true
      }
      return false
    } else {
      return isInForLoop(node.parent, key)
    }
  }
  return false
}

function findAllDeclaredVariables(scope) {
  let refs = []
  refs = refs.concat(scope.declaredVariables ? scope.declaredVariables : [])
  if (scope.upper) {
    refs = refs.concat(findAllDeclaredVariables(scope.upper))
  }
  return refs
}

function addDeclaredVariable(name, context) {
  const scope = context.getScope()
  if (!scope.declaredVariables) {
    scope.declaredVariables = []
  }
  scope.declaredVariables.push(name)
}

function addParamsToScope(node, context) {
  const { params } = node
  if (params && params.args) {
    const { args } = params
    args.forEach(a => {
      addDeclaredVariable(a.name.name, context)
    })
  }
}

function getFileGlobals(context) {
  const globalVars = {}
  getProgramGlobalComments(context).forEach(c => {
    getGlobalsFromComment(c).forEach(g => {
      globalVars[g] = true
    })
  })
  return Object.keys(globalVars)
}

function getGlobalsFromComment(comment) {
  const result = /^globals ((?:\S*|,| )*)$/gi.exec(comment.value)
  if (result && result.length === 2) {
    return result[1].split(',').map(r => r.trim())
  }
  return []
}

function getProgramGlobalComments(context) {
  const program = context.getAncestors()[0]
  const comments = program.body.filter(b => b.type === 'Comment')
  comments.filter(c => {
    const result = /^globals ((?:\S*|,| )*)$/gi.exec(c.value)
    return (result && result.length === 2)
  })
  return comments
}

module.exports = {
  globals,
  isInForEach,
  isInForLoop,
  findAllDeclaredVariables,
  addParamsToScope,
  addDeclaredVariable,
  getFileGlobals,
  getGlobalsFromComment,
  getProgramGlobalComments
}
