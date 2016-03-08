/**
 * The ProtoBuf namespace.
 * @exports ProtoBuf
 * @namespace
 * @export
 */
var ProtoBuf = {};

/**
 * @type {!function(new: ByteBuffer, ...[*])}
 * @export
 */
ProtoBuf.ByteBuffer = ByteBuffer;

/**
 * @type {?function(new: Long, ...[*])}
 * @export
 */
ProtoBuf.Long = ByteBuffer.Long || null;

/**
 * ProtoBuf.js version.
 * @type {string}
 * @const
 * @export
 */
ProtoBuf.VERSION = "/*?= VERSION */";

/**
 * Wire types.
 * @type {Object.<string,number>}
 * @const
 * @export
 */
ProtoBuf.WIRE_TYPES = {};

/**
 * Varint wire type.
 * @type {number}
 * @export
 */
ProtoBuf.WIRE_TYPES.VARINT = 0;

/**
 * Fixed 64 bits wire type.
 * @type {number}
 * @const
 * @export
 */
ProtoBuf.WIRE_TYPES.BITS64 = 1;

/**
 * Length delimited wire type.
 * @type {number}
 * @const
 * @export
 */
ProtoBuf.WIRE_TYPES.LDELIM = 2;

/**
 * Start group wire type.
 * @type {number}
 * @const
 * @export
 */
ProtoBuf.WIRE_TYPES.STARTGROUP = 3;

/**
 * End group wire type.
 * @type {number}
 * @const
 * @export
 */
ProtoBuf.WIRE_TYPES.ENDGROUP = 4;

/**
 * Fixed 32 bits wire type.
 * @type {number}
 * @const
 * @export
 */
ProtoBuf.WIRE_TYPES.BITS32 = 5;

/**
 * Packable wire types.
 * @type {!Array.<number>}
 * @const
 * @export
 */
ProtoBuf.PACKABLE_WIRE_TYPES = [
    ProtoBuf.WIRE_TYPES.VARINT,
    ProtoBuf.WIRE_TYPES.BITS64,
    ProtoBuf.WIRE_TYPES.BITS32
];

/**
 * Types.
 * @dict
 * @type {!Object.<string,{name: string, wireType: number, defaultValue: *}>}
 * @const
 * @export
 */
ProtoBuf.TYPES = {
    // According to the protobuf spec.
    "int32": {
        name: "int32",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: 0
    },
    "uint32": {
        name: "uint32",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: 0
    },
    "sint32": {
        name: "sint32",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: 0
    },
    "int64": {
        name: "int64",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
    },
    "uint64": {
        name: "uint64",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : undefined
    },
    "sint64": {
        name: "sint64",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
    },
    "bool": {
        name: "bool",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: false
    },
    "double": {
        name: "double",
        wireType: ProtoBuf.WIRE_TYPES.BITS64,
        defaultValue: 0
    },
    "string": {
        name: "string",
        wireType: ProtoBuf.WIRE_TYPES.LDELIM,
        defaultValue: ""
    },
    "bytes": {
        name: "bytes",
        wireType: ProtoBuf.WIRE_TYPES.LDELIM,
        defaultValue: null // overridden in the code, must be a unique instance
    },
    "fixed32": {
        name: "fixed32",
        wireType: ProtoBuf.WIRE_TYPES.BITS32,
        defaultValue: 0
    },
    "sfixed32": {
        name: "sfixed32",
        wireType: ProtoBuf.WIRE_TYPES.BITS32,
        defaultValue: 0
    },
    "fixed64": {
        name: "fixed64",
        wireType: ProtoBuf.WIRE_TYPES.BITS64,
        defaultValue:  ProtoBuf.Long ? ProtoBuf.Long.UZERO : undefined
    },
    "sfixed64": {
        name: "sfixed64",
        wireType: ProtoBuf.WIRE_TYPES.BITS64,
        defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
    },
    "float": {
        name: "float",
        wireType: ProtoBuf.WIRE_TYPES.BITS32,
        defaultValue: 0
    },
    "enum": {
        name: "enum",
        wireType: ProtoBuf.WIRE_TYPES.VARINT,
        defaultValue: 0
    },
    "message": {
        name: "message",
        wireType: ProtoBuf.WIRE_TYPES.LDELIM,
        defaultValue: null
    },
    "group": {
        name: "group",
        wireType: ProtoBuf.WIRE_TYPES.STARTGROUP,
        defaultValue: null
    }
};

/**
 * Valid map key types.
 * @type {!Array.<!Object.<string,{name: string, wireType: number, defaultValue: *}>>}
 * @const
 * @export
 */
ProtoBuf.MAP_KEY_TYPES = [
    ProtoBuf.TYPES["int32"],
    ProtoBuf.TYPES["sint32"],
    ProtoBuf.TYPES["sfixed32"],
    ProtoBuf.TYPES["uint32"],
    ProtoBuf.TYPES["fixed32"],
    ProtoBuf.TYPES["int64"],
    ProtoBuf.TYPES["sint64"],
    ProtoBuf.TYPES["sfixed64"],
    ProtoBuf.TYPES["uint64"],
    ProtoBuf.TYPES["fixed64"],
    ProtoBuf.TYPES["bool"],
    ProtoBuf.TYPES["string"],
    ProtoBuf.TYPES["bytes"]
];

/**
 * Minimum field id.
 * @type {number}
 * @const
 * @export
 */
ProtoBuf.ID_MIN = 1;

/**
 * Maximum field id.
 * @type {number}
 * @const
 * @export
 */
ProtoBuf.ID_MAX = 0x1FFFFFFF;

/**
 * If set to `true`, field names will be converted from underscore notation to camel case. Defaults to `false`.
 *  Must be set prior to parsing.
 * @type {boolean}
 * @export
 */
ProtoBuf.convertFieldsToCamelCase = false;

/**
 * By default, messages are populated with (setX, set_x) accessors for each field. This can be disabled by
 *  setting this to `false` prior to building messages.
 * @type {boolean}
 * @export
 */
ProtoBuf.populateAccessors = true;

/**
 * Allow custom javascript representations for some message types by provideing encode and decode functions
 * to translate from the custom javascript representation to the message format and back, respectively.
 * @type {!Object<string,{encode: function(*), decode: function(*)}>}
 */
ProtoBuf.translators = {};

/**
 * By default, messages are populated with default values if a field is not present on the wire. To disable
 *  this behavior, set this setting to `false`.
 * @type {boolean}
 * @export
 */
ProtoBuf.populateDefaults = true;

//? include("ProtoBuf/Util.js");

//? include("ProtoBuf/Lang.js");

//? if (DOTPROTO) include("ProtoBuf/DotProto.js");

//? include("ProtoBuf/Reflect.js");

//? include("ProtoBuf/Builder.js");

//? include("ProtoBuf/Map.js");

//? if (DOTPROTO) {

/**
 * Loads a .proto string and returns the Builder.
 * @param {string} proto .proto file contents
 * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
 * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
 * @return {ProtoBuf.Builder} Builder to create new messages
 * @throws {Error} If the definition cannot be parsed or built
 * @export
 */
ProtoBuf.loadProto = function(proto, builder, filename) {
    if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
        filename = builder,
        builder = undefined;
    return ProtoBuf.loadJson(ProtoBuf.DotProto.Parser.parse(proto), builder, filename);
};

/**
 * Loads a .proto string and returns the Builder. This is an alias of {@link ProtoBuf.loadProto}.
 * @function
 * @param {string} proto .proto file contents
 * @param {(ProtoBuf.Builder|string)=} builder Builder to append to. Will create a new one if omitted.
 * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
 * @return {ProtoBuf.Builder} Builder to create new messages
 * @throws {Error} If the definition cannot be parsed or built
 * @export
 */
ProtoBuf.protoFromString = ProtoBuf.loadProto; // Legacy

/**
 * Loads a .proto file and returns the Builder.
 * @param {string|{root: string, file: string}} filename Path to proto file or an object specifying 'file' with
 *  an overridden 'root' path for all imported files.
 * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
 *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
 *  file will be read synchronously and this function will return the Builder.
 * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
 * @return {?ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
 *   request has failed), else undefined
 * @export
 */
ProtoBuf.loadProtoFile = function(filename, callback, builder) {
    if (callback && typeof callback === 'object')
        builder = callback,
        callback = null;
    else if (!callback || typeof callback !== 'function')
        callback = null;
    if (callback)
        return ProtoBuf.Util.fetch(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(contents) {
            if (contents === null) {
                callback(Error("Failed to fetch file"));
                return;
            }
            try {
                callback(null, ProtoBuf.loadProto(contents, builder, filename));
            } catch (e) {
                callback(e);
            }
        });
    var contents = ProtoBuf.Util.fetch(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename);
    return contents === null ? null : ProtoBuf.loadProto(contents, builder, filename);
};

/**
 * Loads a .proto file and returns the Builder. This is an alias of {@link ProtoBuf.loadProtoFile}.
 * @function
 * @param {string|{root: string, file: string}} filename Path to proto file or an object specifying 'file' with
 *  an overridden 'root' path for all imported files.
 * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
 *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
 *  file will be read synchronously and this function will return the Builder.
 * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
 * @return {!ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
 *   request has failed), else undefined
 * @export
 */
ProtoBuf.protoFromFile = ProtoBuf.loadProtoFile; // Legacy

//? } // DOTPROTO

/**
 * Constructs a new empty Builder.
 * @param {Object.<string,*>=} options Builder options, defaults to global options set on ProtoBuf
 * @return {!ProtoBuf.Builder} Builder
 * @export
 */
ProtoBuf.newBuilder = function(options) {
    options = options || {};
    if (typeof options['convertFieldsToCamelCase'] === 'undefined')
        options['convertFieldsToCamelCase'] = ProtoBuf.convertFieldsToCamelCase;
    if (typeof options['populateAccessors'] === 'undefined')
        options['populateAccessors'] = ProtoBuf.populateAccessors;
    if (typeof options['translators'] === 'undefined')
        options['translators'] = ProtoBuf.translators;
    return new ProtoBuf.Builder(options);
};

/**
 * Loads a .json definition and returns the Builder.
 * @param {!*|string} json JSON definition
 * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
 * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
 * @return {ProtoBuf.Builder} Builder to create new messages
 * @throws {Error} If the definition cannot be parsed or built
 * @export
 */
ProtoBuf.loadJson = function(json, builder, filename) {
    if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
        filename = builder,
        builder = null;
    if (!builder || typeof builder !== 'object')
        builder = ProtoBuf.newBuilder();
    if (typeof json === 'string')
        json = JSON.parse(json);
    builder["import"](json, filename);
    builder.resolveAll();
    return builder;
};

/**
 * Loads a .json file and returns the Builder.
 * @param {string|!{root: string, file: string}} filename Path to json file or an object specifying 'file' with
 *  an overridden 'root' path for all imported files.
 * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
 *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
 *  file will be read synchronously and this function will return the Builder.
 * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
 * @return {?ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
 *   request has failed), else undefined
 * @export
 */
ProtoBuf.loadJsonFile = function(filename, callback, builder) {
    if (callback && typeof callback === 'object')
        builder = callback,
        callback = null;
    else if (!callback || typeof callback !== 'function')
        callback = null;
    if (callback)
        return ProtoBuf.Util.fetch(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(contents) {
            if (contents === null) {
                callback(Error("Failed to fetch file"));
                return;
            }
            try {
                callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
            } catch (e) {
                callback(e);
            }
        });
    var contents = ProtoBuf.Util.fetch(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename);
    return contents === null ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
};
