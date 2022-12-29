export const XmlSchemaKey = {
    Main: 'Main',
    Relationships: 'Relationships',
    DrawingML: 'DrawingML',
    Theme: 'Theme',
};

/** @enum {string} XmlSchema */
export const XmlSchema = {
    Main: 'http://schemas.microsoft.com/office/visio/2012/main',
    Relationships: 'http://schemas.openxmlformats.org/package/2006/relationships',
    ContentTypes: 'http://schemas.openxmlformats.org/package/2006/content-types',

    DocumentRelationships: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    VisioMasterRelationship: 'http://schemas.microsoft.com/visio/2010/relationships/master',
    DocumentImageRelationships: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
    CustomProperties: 'http://schemas.openxmlformats.org/officeDocument/2006/custom-properties',
    DocPropsVTypes: 'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes',

    // @see {https://en.wikipedia.org/wiki/Office_Open_XML_file_formats#DrawingML}
    DrawingML: 'http://schemas.openxmlformats.org/drawingml/2006/main',
    Theme: 'http://schemas.microsoft.com/office/visio/2012/theme',
};

/** @enum {string} VisioFilePath */
export const VisioFilePath = {
    // level 0
    Rels: '_rels/.rels',

    // level 1
    // docProps/app.xml
    // visio/document.xml
    // docProps/core.xml
    // docProps/custom.xml
    // docProps/app.xml
    //
    // level 2 - visio/document.xml
    //
    //
    //

    DocumentRels: 'visio/_rels/document.xml.rels',
    MastersRels: 'visio/masters/_rels/masters.xml.rels',
    PagesRels: 'visio/pages/_rels/pages.xml.rels',
};

/** @enum {string} VisioAttributeType */
export const VisioAttributeType = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    any: 'any',
};

/** @enum {string} VisioJxonType */
export const VisioJxonType = {
    Cell: 'Cell',
    Row: 'Row',
    Master: 'Master',
    Section: 'Section',
    Shape: 'Shape',
    ShapeText: 'ShapeText',
    PageSheet: 'PageSheet',
    Page: 'Page',
    Icon: 'Icon',
    Image: 'Image',
    Document: 'Document',
    StyleSheet: 'StyleSheet',
    ForeignData: 'ForeignData',
    DocumentSettings: 'DocumentSettings',
    DocumentSheet: 'DocumentSheet',

    SchemeClr: 'SchemeClr',
    Connect: 'Connect',

    FaceName: 'FaceName',
};

/** @enum {string} VisioCellKey */
export const VisioJxonCellKey = {
    Name: '@N',
    Value: '@V',
    Units: '@U',
    Formula: '@F',
};

export const LocalToVisioCellKey = {
    name: VisioJxonCellKey.Name,
    value: VisioJxonCellKey.Value,
    units: VisioJxonCellKey.Units,
    formula: VisioJxonCellKey.Formula
}

/** @enum {string} VisioJxonConnectKey */
export const VisioJxonConnectKey = {
    FromSheet: '@FromSheet',
    FromCell: '@FromCell',
    FromPart: '@FromPart',
    ToSheet: '@ToSheet',
    ToCell: '@ToCell',
    ToPart: '@ToPart',
};

/** @enum {string} VisioJxonConnectKey */
export const VisioJxonThemeKey = {
    'a:themeElements': 'a:themeElements',
    'a:objectDefaults': 'a:objectDefaults',
    'a:extraClrSchemeLst': 'a:extraClrSchemeLst',
    '@xmlns:a': '@xmlns:a',
    '@name': '@name',
};

/** @enum {string} VisioJxonConnectKeyA */
export const VisioJxonThemeKeyA = {
    ThemeElements: 'a:themeElements',
    ObjectDefaults: 'a:objectDefaults',
    ExtraClrSchemeLst: 'a:extraClrSchemeLst',
    Name: '@name',
};

/** @enum {string} VisioJxonThemeSubKey */
export const VisioJxonThemeSubKey = {
    '@val': '@val', // a: namespace
    '@uri': '@uri', // vt: namespace
    '@typeface': '@typeface',
    '@xmlns': '@xmlns',
    '@xmlns:vt': '@xmlns:vt',
    '@schemeEnum': '@schemeEnum',
    '@schemeGUID': '@schemeGUID',
    '@ang': '@ang',
    '@scaled': '@scaled',
    '@rotWithShape': '@rotWithShape',
    '@name': '@name',

    'a:clrScheme': 'a:clrScheme',
    'a:srgbClr': 'a:srgbClr',

    'a:lt1': 'a:lt1',
    'a:dk1': 'a:dk1',
    'a:lt2': 'a:lt2',
    'a:dk2': 'a:dk2',


    'a:font': 'a:font',

    'a:ext': 'a:ext',
    'a:solidFill': 'a:solidFill',
    'a:ln': 'a:ln',
    'a:effectStyle': 'a:effectStyle',
    'a:gs': 'a:gs',

    'vt:schemeID': 'vt:schemeID',
    'vt:bkgnd': 'vt:bkgnd',
    'vt:variationClrSchemeLst': 'vt:variationClrSchemeLst',

    'a:accent1': 'a:accent1',
    'a:accent2': 'a:accent2',
    'a:accent3': 'a:accent3',
    'a:accent4': 'a:accent4',
    'a:accent5': 'a:accent5',
    'a:accent6': 'a:accent6',

    'a:hlink': 'a:hlink',
    'a:folHlink': 'a:folHlink',
    'a:extLst': 'a:extLst',
    'a:fontScheme': 'a:fontScheme',
    'a:majorFont': 'a:majorFont',
    'a:latin': 'a:latin',
    'a:ea': 'a:ea',
    'a:cs': 'a:cs',
    'a:minorFont': 'a:minorFont',
    'a:fmtScheme': 'a:fmtScheme',
    'a:fillStyleLst': 'a:fillStyleLst',
    'a:lnStyleLst': 'a:lnStyleLst',
    'a:effectStyleLst': 'a:effectStyleLst',
    'a:bgFillStyleLst': 'a:bgFillStyleLst',
    'a:gradFill': 'a:gradFill',
    'a:gsLst': 'a:gsLst',
    'a:lin': 'a:lin',

    'a:schemeClr': 'a:schemeClr',

    'a:satMod': 'a:satMod',
    'a:lumMod': 'a:lumMod',

    'a:variationClrSchemeLst': 'a:variationClrSchemeLst',
    'vt:variationClrScheme': 'vt:variationClrScheme',
};

/** @enum {string} VisioJxonThemeSubKeyA */
export const VisioJxonThemeSubKeyA = {
    clrScheme: 'a:clrScheme',
    srgbClr: 'a:srgbClr',
    font: 'a:font',
    value: '@val',
    ext: 'a:ext',
    solidFill: 'a:solidFill',
    ln: 'a:ln',
    effectStyle: 'a:effectStyle',
    gs: 'a:gs',
    schemeClr: 'a:schemeClr',
    satMod: 'a:satMod',
    lumMod: 'a:lumMod',
    gradFill: 'a:gradFill',

    // colors
    light1: 'a:lt1',
    dark1: 'a:dk1',
    light2: 'a:lt2',
    dark2: 'a:dk2',
    accent1: 'a:accent1',
    accent2: 'a:accent2',
    accent3: 'a:accent3',
    accent4: 'a:accent4',
    accent5: 'a:accent5',
    accent6: 'a:accent6',
    //TODO miky more custom colors possible

    // CT_VariationClrSchemeLst
    // Specifies four distinct color scheme lists of four distinct
    // dynamic theme variants in a dynamic theme.
    variationClrSchemeLst: 'a:variationClrSchemeLst',
    variationClrScheme: 'vt:variationClrScheme',
};

/** @enum {string} VisioJxonThemeSubKeyVt */
export const VisioJxonThemeSubKeyVt = {
    // B
    bkgnd: 'vt:bkgnd',

    // F
    fillStyles: 'vt:fillStyles',
    fmtSchemeEx: 'vt:fmtSchemeEx',
    fmtConnectorSchemeEx: 'vt:fmtConnectorSchemeEx',
    fontStylesGroup: 'vt:fontStylesGroup',

    // L
    lineStyles: 'vt:lineStyles',

    // S
    schemeEnum: '@schemeEnum',
    schemeGUID: '@schemeGUID', // ignored - anyway always {00000000-0000-0000-0000-000000000000}
    schemeID: 'vt:schemeID',

    // T
    themeScheme: 'vt:themeScheme',

    // U
    uri: '@uri', // vt: namespace

    // V
    variationClrSchemeLst: 'vt:variationClrSchemeLst',
    variationStyleSchemeLst: 'vt:variationStyleSchemeLst',

    // X
    xmlnsVt: '@xmlns:vt',
};

/** @enum {string} VisioJxonThemeSubKeyVt */
export const VisioJxonThemePrefix = {
    vt: 'vt:',
    a: 'a:'
};

/** @enum {string} VisioJxonThemeFontAttribute */
export const VisioJxonThemeFontAttribute = {
    script: '@script',
    typeface: '@typeface',
};


/**
 * @enum {string} VisioJxonMasterKey
 * @see {http://localhost/MS-VSDX.pdf#page=119}
 */
export const VisioJxonMasterKey = {
    // objects
    PageSheet: 'PageSheet',
    Rel: 'Rel', // required
    Icon: 'Icon',

    // properties
    Id: '@ID', // required
    UniqueId: '@UniqueID',
    MasterType: '@MasterType',
    BaseId: '@BaseID',

    NameU: '@NameU',                // language-independent name
    IsCustomNameU: '@IsCustomNameU',
    Name: '@Name',                  // language-dependent name
    IsCustomName: '@IsCustomName',
    Prompt: '@Prompt',              // "tooltip" "This connector..."

    Hidden: '@Hidden',
    IconSize: '@IconSize',
    AlignName: '@AlignName',
    MatchByName: '@MatchByName',
    IconUpdate: '@IconUpdate',
    PatternFlags: '@PatternFlags',
};

/** @enum {string} VisioJxonRelationKey */
export const VisioJxonRelationKey = {
    // root
    Relationship: 'Relationship',

    // inside relation
    Id: '@Id',
    Type: '@Type',
    Target: '@Target',
};

/** @enum {string} VisioRelationType */
export const VisioRelationType = {
    Document: 'Document',
    Master: 'Master',
    Masters: 'Masters',
    Page: 'Page',
    Pages: 'Pages',
    Windows: 'Windows',
    Theme: 'Theme',
    Image: 'Image',
    Solutions: 'Solutions',

    // getTopRelationsMap
    coreProperties: 'coreProperties',
    thumbnail: 'thumbnail',
    document: 'document',
    customProperties: 'customProperties',
    extendedProperties: 'extendedProperties',
};


/** @enum {string} VisioRelationTypeSchema */
export const VisioRelationTypeSchema = {
    // document
    Windows: 'http://schemas.microsoft.com/visio/2010/relationships/windows',
    Pages: 'http://schemas.microsoft.com/visio/2010/relationships/pages',

    // pages
    Page: 'http://schemas.microsoft.com/visio/2010/relationships/page',

    // master
    Master: 'http://schemas.microsoft.com/visio/2010/relationships/master',
    Masters: 'http://schemas.microsoft.com/visio/2010/relationships/masters',

    //
    Theme: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme',
};

/** @enum {string} VisioRelationSchemaToType */
export const VisioRelationSchemaToType = {
    // document
    'http://schemas.microsoft.com/visio/2010/relationships/windows':
    VisioRelationType.Windows,
    'http://schemas.microsoft.com/visio/2010/relationships/pages':
    VisioRelationType.Pages,

    // pages
    'http://schemas.microsoft.com/visio/2010/relationships/page':
    VisioRelationType.Page,

    // master
    'http://schemas.microsoft.com/visio/2010/relationships/master':
    VisioRelationType.Master,

    'http://schemas.microsoft.com/visio/2010/relationships/masters':
    VisioRelationType.Masters,

    //
    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme':
    VisioRelationType.Theme,

    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image':
    VisioRelationType.Image,

    'http://schemas.microsoft.com/visio/2010/relationships/solutions':
    VisioRelationType.Solutions,

    'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties':
        'coreProperties',
    'http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail':
        'thumbnail',
    'http://schemas.microsoft.com/visio/2010/relationships/document':
        'document',
    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties':
        'customProperties',
    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties':
        'extendedProperties',


};

/** @enum {string} VisioCellKey */
export const VisioJxonSectionKey = {
    Name: '@N',
    Id: '@IX',
    Row: 'Row'
};

export const VisioJxonRowKey = {
    Name: '@N',
    Id: '@IX',
    Type: '@T',
    Cell: 'Cell'
}

/** @enum {string} VisioJxonShapeKey */
export const VisioJxonShapeKey = {
    // required
    Id: '@ID',

    // objects
    Shapes: 'Shapes', // in grouped shape
    Section: 'Section',
    Cell: 'Cell',
    Text: 'Text',
    Connect: 'Connect', //TODO miky which one
    Connects: 'Connects', //TODO miky which one

    // properties
    MasterShapeId: '@MasterShape',
    MasterId: '@Master',
    Type: '@Type',
};

/** @enum {string} VisioJxonShapesKey */
export const VisioJxonShapesKey = {
    Shape: 'Shape',
};

/** @enum {string} VisioJxonKey */
export const VisioJxonKey = {
    // required
    Id: '@ID',

    // objects
    Cell: 'Cell',
    Row: 'Row',
    Section: 'Section',
    Text: 'Text',
    Rel: 'Rel',
    PageSheet: 'PageSheet',
    Icon: 'Icon',
    ForeignData: 'ForeignData',

    // attributes
    Type: '@Type',
    xmlns: '@xmlns',
    xmlnsR : '@xmlns:r',
    xmlSpace : '@xml:space',

};
/** @enum {string} VisioJxonDocumentKey */
export const VisioJxonDocumentKey = {
    DocumentSettings: 'DocumentSettings',
    Colors: 'Colors',
    FaceNames: 'FaceNames',
    StyleSheets: 'StyleSheets',
    DocumentSheet: 'DocumentSheet',

    ColorEntry: 'ColorEntry',
    Ix: '@IX',
    Rgb: '@RGB',

};

/** @enum {string} VisioShapeKey */
export const VisioShapeKey = {
    // required
    Id: 'id',

    // objects
    Section: 'section',
    Cell: 'cell',
    Text: 'text',

    // properties
    Type: 'type',

    // extras
    Group: 'Group',
    DebugType: 'debugType',

};


/** @enum {string} VisioJxonShapeTextKey */
export const VisioJxonShapeTextKey = {
    // objects
    CharacterProperties: 'cp',

    // properties
    Content: 'keyValue', // '@keyValue'
};

/** @enum {string} VisioJxonIconKey */
export const VisioJxonIconKey = {
    // properties
    Content: 'keyValue',
};


/** @enum {string} VisioCellKey */
export const VisioJxonRelKey = {
    RelId: '@r:id' // example @r:id = "rId1"
};

/** @enum {string} VisioJxonPageKey */
export const VisioJxonPageKey = {
    Name: '@Name',          // language-dependent name
    NameUnique: '@NameU',   // language-independent name
    Id: '@ID',
    PageSheet: 'PageSheet',
    Rel: 'Rel',             // ST_RelationshipId
};


/** @enum {string} VisioUnitType */
export const VisioUnitType = {

    // A
    AC: 'AC',       // Acres
    AD: 'AD',       // Degrees-minutes-seconds

    // B
    BOOL: 'BOOL',   // Boolean

    // C
    C: 'C',         // Ciceros
    C_D: 'C_D',     // Ciceros and didots
    CM: 'CM',       // Centimeters
    COLOR: 'COLOR', // RGB color value
    CY: 'CY',       // Currency

    // D
    D: 'D',         // Didots
    DA: 'DA',       // Radians
    DATE: 'DATE',   // Days
    DE: 'DE',       // Days
    DEG: 'DEG',     // Degrees
    DL: 'DL',       // Inches
    DP: 'DP',       // Inches
    DT: 'DT',       // Points

    // E
    ED: 'ED',       // Days
    EH: 'EH',       // Hours
    EM: 'EM',       // Minutes
    ES: 'ES',       // Seconds
    EW: 'EW',       // Weeks

    // F
    F_I: 'F_I',     // Feet and inches
    FT: 'FT',       // Feet

    // H
    HA: 'HA',       // Hectare

    // I
    IN: 'IN',       // Inches
    IN_F: 'IN_F',   // Inches

    // K
    KM: 'KM',       // Kilometers

    // M
    M: 'M',         // Meters
    MI: 'MI',       // Miles
    MI_F: 'MI_F',   // Miles
    MM: 'MM',       // Millimeters

    // N
    NM: 'NM',       // Nautical miles

    // P
    PER: 'PER',     // Percentage
    P_PT: 'P_PT',   // Picas and points
    PT: 'PT',       // Points
    P: 'P',         // Picas
    PNT: 'PNT',     // Coordinates of a two-dimensional point

    // R
    RAD: 'RAD',     // Radians

    // S
    STR: 'STR',     // String

    // Y
    YD: 'YD',       // Yards
};

// todo: rename to TextVisioCellName
export const TextVisioCellAttributeName = {
    LeftMargin: 'LeftMargin',
    RightMargin: 'RightMargin',
    TopMargin: 'TopMargin',
    BottomMargin: 'BottomMargin',
    DefaultTabStop: 'DefaultTabStop',
    TextBkgnd: 'TextBkgnd',
    TextBkgndTrans: 'TextBkgndTrans',
    VerticalAlign: 'VerticalAlign',
};

// todo: rename to FillVisioCellName
export const FillVisioCellAttributeName = {
    FillForegnd: 'FillForegnd',
    FillBkgnd: 'FillBkgnd',
    FillPattern: 'FillPattern',
    FillForegndTrans: 'FillForegndTrans',
    FillBkgndTrans: 'FillBkgndTrans',
};

// todo: rename to LineVisioCellName
export const LineVisioCellAttributeName = {
    LineColor: 'LineColor',
    LineWeight: 'LineWeight',
    LineColorTrans: 'LineColorTrans',
    LinePattern: 'LinePattern',
};

/** @enum {string} VisioCellName */
export const VisioCellName = {
    A: 'A', // @see {http://localhost/MS-VSDX.pdf#page=159}
    Action: 'Action', // @see {http://localhost/MS-VSDX.pdf#page=159}
    Active: 'Active', // @see {http://localhost/MS-VSDX.pdf#page=160}
    AddMarkup: 'AddMarkup', // @see {http://localhost/MS-VSDX.pdf#page=160}
    Address: 'Address', // @see {http://localhost/MS-VSDX.pdf#page=160}
    AlignBottom: 'AlignBottom', // @see {http://localhost/MS-VSDX.pdf#page=160}
    AlignCenter: 'AlignCenter', // @see {http://localhost/MS-VSDX.pdf#page=160}
    AlignLeft: 'AlignLeft', // @see {http://localhost/MS-VSDX.pdf#page=160}
    Alignment: 'Alignment', // @see {http://localhost/MS-VSDX.pdf#page=160}
    Alignment0: 'Alignment0', //TODO miky BRND page1.xml
    AlignMiddle: 'AlignMiddle', // @see {http://localhost/MS-VSDX.pdf#page=161}
    AlignRight: 'AlignRight', // @see {http://localhost/MS-VSDX.pdf#page=161}
    AlignTop: 'AlignTop', // @see {http://localhost/MS-VSDX.pdf#page=161}
    Angle: 'Angle', // @see {http://localhost/MS-VSDX.pdf#page=161}
    AsianFont: 'AsianFont', // @see {http://localhost/MS-VSDX.pdf#page=161}
    AutoGen: 'AutoGen', // @see {http://localhost/MS-VSDX.pdf#page=161}
    AvenueSizeX: 'AvenueSizeX', // @see {http://localhost/MS-VSDX.pdf#page=161}
    AvenueSizeY: 'AvenueSizeY', // @see {http://localhost/MS-VSDX.pdf#page=161}
    AvoidPageBreaks: 'AvoidPageBreaks', // @see {http://localhost/MS-VSDX.pdf#page=161}
    B: 'B', // @see {http://localhost/MS-VSDX.pdf#page=162}
    BeginArrow: 'BeginArrow', // @see {http://localhost/MS-VSDX.pdf#page=162}
    BeginArrowSize: 'BeginArrowSize', // @see {http://localhost/MS-VSDX.pdf#page=164}
    BeginGroup: 'BeginGroup', // @see {http://localhost/MS-VSDX.pdf#page=165}
    BeginX: 'BeginX', // @see {http://localhost/MS-VSDX.pdf#page=165}
    BeginY: 'BeginY', // @see {http://localhost/MS-VSDX.pdf#page=165}
    BegTrigger: 'BegTrigger', // @see {http://localhost/MS-VSDX.pdf#page=165}
    BevelBottomHeight: 'BevelBottomHeight', // @see {http://localhost/MS-VSDX.pdf#page=165}
    BevelBottomType: 'BevelBottomType', // @see {http://localhost/MS-VSDX.pdf#page=165}
    BevelBottomWidth: 'BevelBottomWidth', // @see {http://localhost/MS-VSDX.pdf#page=166}
    BevelContourColor: 'BevelContourColor', // @see {http://localhost/MS-VSDX.pdf#page=166}
    BevelContourSize: 'BevelContourSize', // @see {http://localhost/MS-VSDX.pdf#page=166}
    BevelDepthColor: 'BevelDepthColor', // @see {http://localhost/MS-VSDX.pdf#page=166}
    BevelDepthSize: 'BevelDepthSize', // @see {http://localhost/MS-VSDX.pdf#page=166}
    BevelLightingAngle: 'BevelLightingAngle', // @see {http://localhost/MS-VSDX.pdf#page=166}
    BevelLightingType: 'BevelLightingType', // @see {http://localhost/MS-VSDX.pdf#page=167}
    BevelMaterialType: 'BevelMaterialType', // @see {http://localhost/MS-VSDX.pdf#page=167}
    BevelTopHeight: 'BevelTopHeight', // @see {http://localhost/MS-VSDX.pdf#page=168}
    BevelTopType: 'BevelTopType', // @see {http://localhost/MS-VSDX.pdf#page=168}
    BevelTopWidth: 'BevelTopWidth', // @see {http://localhost/MS-VSDX.pdf#page=169}
    BlockSizeX: 'BlockSizeX', // @see {http://localhost/MS-VSDX.pdf#page=169}
    BlockSizeY: 'BlockSizeY', // @see {http://localhost/MS-VSDX.pdf#page=169}
    Blur: 'Blur', // @see {http://localhost/MS-VSDX.pdf#page=169}
    BottomMargin: 'BottomMargin', // @see {http://localhost/MS-VSDX.pdf#page=169}
    Brightness: 'Brightness', // @see {http://localhost/MS-VSDX.pdf#page=169}
    Bullet: 'Bullet', // @see {http://localhost/MS-VSDX.pdf#page=170}
    BulletFont: 'BulletFont', // @see {http://localhost/MS-VSDX.pdf#page=170}
    BulletFontSize: 'BulletFontSize', // @see {http://localhost/MS-VSDX.pdf#page=170}
    BulletStr: 'BulletStr', // @see {http://localhost/MS-VSDX.pdf#page=170}
    ButtonFace: 'ButtonFace', // @see {http://localhost/MS-VSDX.pdf#page=171}
    C: 'C', // @see {http://localhost/MS-VSDX.pdf#page=171}
    Calendar: 'Calendar', // @see {http://localhost/MS-VSDX.pdf#page=171}
    CanGlue: 'CanGlue', // @see {http://localhost/MS-VSDX.pdf#page=171}
    Case: 'Case', // @see {http://localhost/MS-VSDX.pdf#page=171}
    CenterX: 'CenterX', // @see {http://localhost/MS-VSDX.pdf#page=172}
    CenterY: 'CenterY', // @see {http://localhost/MS-VSDX.pdf#page=172}
    Checked: 'Checked', // @see {http://localhost/MS-VSDX.pdf#page=172}
    ClippingPath: 'ClippingPath', // @see {http://localhost/MS-VSDX.pdf#page=172}
    Color: 'Color', // @see {http://localhost/MS-VSDX.pdf#page=172}
    ColorSchemeIndex: 'ColorSchemeIndex', // @see {http://localhost/MS-VSDX.pdf#page=173}
    ColorTrans: 'ColorTrans', // @see {http://localhost/MS-VSDX.pdf#page=173}
    Comment: 'Comment', // @see {http://localhost/MS-VSDX.pdf#page=174}
    ComplexScriptFont: 'ComplexScriptFont', // @see {http://localhost/MS-VSDX.pdf#page=174}
    ComplexScriptSize: 'ComplexScriptSize', // @see {http://localhost/MS-VSDX.pdf#page=174}
    CompoundType: 'CompoundType', // @see {http://localhost/MS-VSDX.pdf#page=174}
    ConFixedCode: 'ConFixedCode', // @see {http://localhost/MS-VSDX.pdf#page=175}
    ConLineJumpCode: 'ConLineJumpCode', // @see {http://localhost/MS-VSDX.pdf#page=175}
    ConLineJumpDirX: 'ConLineJumpDirX', // @see {http://localhost/MS-VSDX.pdf#page=175}
    ConLineJumpDirY: 'ConLineJumpDirY', // @see {http://localhost/MS-VSDX.pdf#page=175}
    ConLineJumpStyle: 'ConLineJumpStyle', // @see {http://localhost/MS-VSDX.pdf#page=175}
    ConLineRouteExt: 'ConLineRouteExt', // @see {http://localhost/MS-VSDX.pdf#page=175}
    ConnectorSchemeIndex: 'ConnectorSchemeIndex', // @see {http://localhost/MS-VSDX.pdf#page=175}
    Contrast: 'Contrast', // @see {http://localhost/MS-VSDX.pdf#page=175}
    Copyright: 'Copyright', // @see {http://localhost/MS-VSDX.pdf#page=176}
    CtrlAsInput: 'CtrlAsInput', // @see {http://localhost/MS-VSDX.pdf#page=176}
    CurrentIndex: 'CurrentIndex', // @see {http://localhost/MS-VSDX.pdf#page=176}
    D: 'D', // @see {http://localhost/MS-VSDX.pdf#page=176}
    DataLinked: 'DataLinked', // @see {http://localhost/MS-VSDX.pdf#page=176}
    DblUnderline: 'DblUnderline', // @see {http://localhost/MS-VSDX.pdf#page=176}
    Default: 'Default', // @see {http://localhost/MS-VSDX.pdf#page=176}
    DefaultTabStop: 'DefaultTabStop', // @see {http://localhost/MS-VSDX.pdf#page=177}
    Denoise: 'Denoise', // @see {http://localhost/MS-VSDX.pdf#page=177}
    Description: 'Description', // @see {http://localhost/MS-VSDX.pdf#page=177}
    DirX: 'DirX', // @see {http://localhost/MS-VSDX.pdf#page=177}
    DirY: 'DirY', // @see {http://localhost/MS-VSDX.pdf#page=177}
    Disabled: 'Disabled', // @see {http://localhost/MS-VSDX.pdf#page=177}
    DisplayLevel: 'DisplayLevel', // @see {http://localhost/MS-VSDX.pdf#page=177}
    DisplayMode: 'DisplayMode', // @see {http://localhost/MS-VSDX.pdf#page=177}
    DistanceFromGround: 'DistanceFromGround', // @see {http://localhost/MS-VSDX.pdf#page=178}
    DocLangID: 'DocLangID', // @see {http://localhost/MS-VSDX.pdf#page=178}
    DocLockDuplicatePage: 'DocLockDuplicatePage', // @see {http://localhost/MS-VSDX.pdf#page=178}
    DocLockReplace: 'DocLockReplace', // @see {http://localhost/MS-VSDX.pdf#page=178}
    DontMoveChildren: 'DontMoveChildren', // @see {http://localhost/MS-VSDX.pdf#page=178}
    DoubleStrikethrough: 'DoubleStrikethrough', // @see {http://localhost/MS-VSDX.pdf#page=178}
    DrawingResizeType: 'DrawingResizeType', // @see {http://localhost/MS-VSDX.pdf#page=179}
    DrawingScale: 'DrawingScale', // @see {http://localhost/MS-VSDX.pdf#page=179}
    DrawingScaleType: 'DrawingScaleType', // @see {http://localhost/MS-VSDX.pdf#page=179}
    DrawingSizeType: 'DrawingSizeType', // @see {http://localhost/MS-VSDX.pdf#page=179}
    DropOnPageScale: 'DropOnPageScale', // @see {http://localhost/MS-VSDX.pdf#page=180}
    DynamicsOff: 'DynamicsOff', // @see {http://localhost/MS-VSDX.pdf#page=180}
    DynFeedback: 'DynFeedback', // @see {http://localhost/MS-VSDX.pdf#page=180}
    E: 'E', // @see {http://localhost/MS-VSDX.pdf#page=180}
    EffectSchemeIndex: 'EffectSchemeIndex', // @see {http://localhost/MS-VSDX.pdf#page=180}
    EmbellishmentIndex: 'EmbellishmentIndex', // @see {http://localhost/MS-VSDX.pdf#page=180}
    EnableFillProps: 'EnableFillProps', // @see {http://localhost/MS-VSDX.pdf#page=180}
    EnableGrid: 'EnableGrid', // @see {http://localhost/MS-VSDX.pdf#page=181}
    EnableLineProps: 'EnableLineProps', // @see {http://localhost/MS-VSDX.pdf#page=181}
    EnableTextProps: 'EnableTextProps', // @see {http://localhost/MS-VSDX.pdf#page=181}
    EndArrow: 'EndArrow', // @see {http://localhost/MS-VSDX.pdf#page=181}
    EndArrowSize: 'EndArrowSize', // @see {http://localhost/MS-VSDX.pdf#page=181}
    EndTrigger: 'EndTrigger', // @see {http://localhost/MS-VSDX.pdf#page=182}
    EndX: 'EndX', // @see {http://localhost/MS-VSDX.pdf#page=182}
    EndY: 'EndY', // @see {http://localhost/MS-VSDX.pdf#page=182}
    EventDblClick: 'EventDblClick', // @see {http://localhost/MS-VSDX.pdf#page=182}
    EventDrop: 'EventDrop', // @see {http://localhost/MS-VSDX.pdf#page=182}
    EventMultiDrop: 'EventMultiDrop', // @see {http://localhost/MS-VSDX.pdf#page=182}
    EventXFMod: 'EventXFMod', // @see {http://localhost/MS-VSDX.pdf#page=182}
    ExtraInfo: 'ExtraInfo', // @see {http://localhost/MS-VSDX.pdf#page=182}
    FillBkgnd: 'FillBkgnd', // @see {http://localhost/MS-VSDX.pdf#page=183}
    FillBkgndTrans: 'FillBkgndTrans', // @see {http://localhost/MS-VSDX.pdf#page=183}
    FillForegnd: 'FillForegnd', // @see {http://localhost/MS-VSDX.pdf#page=183}
    FillForegndTrans: 'FillForegndTrans', // @see {http://localhost/MS-VSDX.pdf#page=183}
    FillGradientAngle: 'FillGradientAngle', // @see {http://localhost/MS-VSDX.pdf#page=183}
    FillGradientDir: 'FillGradientDir', // @see {http://localhost/MS-VSDX.pdf#page=183}
    FillGradientEnabled: 'FillGradientEnabled', // @see {http://localhost/MS-VSDX.pdf#page=184}
    FillPattern: 'FillPattern', // @see {http://localhost/MS-VSDX.pdf#page=184}
    Flags: 'Flags', // @see {http://localhost/MS-VSDX.pdf#page=187}
    FlipX: 'FlipX', // @see {http://localhost/MS-VSDX.pdf#page=187}
    FlipY: 'FlipY', // @see {http://localhost/MS-VSDX.pdf#page=187}
    FlyoutChild: 'FlyoutChild', // @see {http://localhost/MS-VSDX.pdf#page=187}
    Font: 'Font', // @see {http://localhost/MS-VSDX.pdf#page=187}
    FontScale: 'FontScale', // @see {http://localhost/MS-VSDX.pdf#page=187}
    FontSchemeIndex: 'FontSchemeIndex', // @see {http://localhost/MS-VSDX.pdf#page=188}
    Format: 'Format', // @see {http://localhost/MS-VSDX.pdf#page=188}
    Frame: 'Frame', // @see {http://localhost/MS-VSDX.pdf#page=188}
    Gamma: 'Gamma', // @see {http://localhost/MS-VSDX.pdf#page=188}
    GlowColor: 'GlowColor', // @see {http://localhost/MS-VSDX.pdf#page=188}
    GlowColorTrans: 'GlowColorTrans', // @see {http://localhost/MS-VSDX.pdf#page=188}
    GlowSize: 'GlowSize', // @see {http://localhost/MS-VSDX.pdf#page=188}
    Glue: 'Glue', // @see {http://localhost/MS-VSDX.pdf#page=189}
    GlueType: 'GlueType', // @see {http://localhost/MS-VSDX.pdf#page=189}
    GradientStopColor: 'GradientStopColor', // @see {http://localhost/MS-VSDX.pdf#page=189}
    GradientStopColorTrans: 'GradientStopColorTrans', // @see {http://localhost/MS-VSDX.pdf#page=189}
    GradientStopPosition: 'GradientStopPosition', // @see {http://localhost/MS-VSDX.pdf#page=189}
    Height: 'Height', // @see {http://localhost/MS-VSDX.pdf#page=189}
    HelpTopic: 'HelpTopic', // @see {http://localhost/MS-VSDX.pdf#page=189}
    HideForApply: 'HideForApply', // @see {http://localhost/MS-VSDX.pdf#page=190}
    HideText: 'HideText', // @see {http://localhost/MS-VSDX.pdf#page=190}
    HorzAlign: 'HorzAlign', // @see {http://localhost/MS-VSDX.pdf#page=190}
    ImgHeight: 'ImgHeight', // @see {http://localhost/MS-VSDX.pdf#page=190}
    ImgOffsetX: 'ImgOffsetX', // @see {http://localhost/MS-VSDX.pdf#page=190}
    ImgOffsetY: 'ImgOffsetY', // @see {http://localhost/MS-VSDX.pdf#page=190}
    ImgWidth: 'ImgWidth', // @see {http://localhost/MS-VSDX.pdf#page=190}
    IndFirst: 'IndFirst', // @see {http://localhost/MS-VSDX.pdf#page=191}
    IndLeft: 'IndLeft', // @see {http://localhost/MS-VSDX.pdf#page=191}
    IndRight: 'IndRight', // @see {http://localhost/MS-VSDX.pdf#page=191}
    InhibitSnap: 'InhibitSnap', // @see {http://localhost/MS-VSDX.pdf#page=191}
    Initials: 'Initials', // @see {http://localhost/MS-VSDX.pdf#page=191}
    Invisible: 'Invisible', // @see {http://localhost/MS-VSDX.pdf#page=191}
    IsDropSource: 'IsDropSource', // @see {http://localhost/MS-VSDX.pdf#page=191}
    IsDropTarget: 'IsDropTarget', // @see {http://localhost/MS-VSDX.pdf#page=192}
    IsSnapTarget: 'IsSnapTarget', // @see {http://localhost/MS-VSDX.pdf#page=192}
    IsTextEditTarget: 'IsTextEditTarget', // @see {http://localhost/MS-VSDX.pdf#page=192}
    KeepTextFlat: 'KeepTextFlat', // @see {http://localhost/MS-VSDX.pdf#page=192}
    Label: 'Label', // @see {http://localhost/MS-VSDX.pdf#page=192}
    LangID: 'LangID', // @see {http://localhost/MS-VSDX.pdf#page=192}
    LayerMember: 'LayerMember', // @see {http://localhost/MS-VSDX.pdf#page=192}
    LeftMargin: 'LeftMargin', // @see {http://localhost/MS-VSDX.pdf#page=192}
    Letterspace: 'Letterspace', // @see {http://localhost/MS-VSDX.pdf#page=193}
    LineAdjustFrom: 'LineAdjustFrom', // @see {http://localhost/MS-VSDX.pdf#page=193}
    LineAdjustTo: 'LineAdjustTo', // @see {http://localhost/MS-VSDX.pdf#page=193}
    LineCap: 'LineCap', // @see {http://localhost/MS-VSDX.pdf#page=193}
    LineColor: 'LineColor', // @see {http://localhost/MS-VSDX.pdf#page=193}
    LineColorTrans: 'LineColorTrans', // @see {http://localhost/MS-VSDX.pdf#page=193}
    LineGradientAngle: 'LineGradientAngle', // @see {http://localhost/MS-VSDX.pdf#page=193}
    LineGradientDir: 'LineGradientDir', // @see {http://localhost/MS-VSDX.pdf#page=194}
    LineGradientEnabled: 'LineGradientEnabled', // @see {http://localhost/MS-VSDX.pdf#page=194}
    LineJumpCode: 'LineJumpCode', // @see {http://localhost/MS-VSDX.pdf#page=194}
    LineJumpFactorX: 'LineJumpFactorX', // @see {http://localhost/MS-VSDX.pdf#page=194}
    LineJumpFactorY: 'LineJumpFactorY', // @see {http://localhost/MS-VSDX.pdf#page=195}
    LineJumpStyle: 'LineJumpStyle', // @see {http://localhost/MS-VSDX.pdf#page=195}
    LinePattern: 'LinePattern', // @see {http://localhost/MS-VSDX.pdf#page=195}
    LineRouteExt: 'LineRouteExt', // @see {http://localhost/MS-VSDX.pdf#page=196}
    LineToLineX: 'LineToLineX', // @see {http://localhost/MS-VSDX.pdf#page=196}
    LineToLineY: 'LineToLineY', // @see {http://localhost/MS-VSDX.pdf#page=196}
    LineToNodeX: 'LineToNodeX', // @see {http://localhost/MS-VSDX.pdf#page=196}
    LineToNodeY: 'LineToNodeY', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LineWeight: 'LineWeight', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LocalizeMerge: 'LocalizeMerge', // @see {http://localhost/MS-VSDX.pdf#page=197}
    Lock: 'Lock', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LockAspect: 'LockAspect', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LockBegin: 'LockBegin', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LockCalcWH: 'LockCalcWH', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LockCrop: 'LockCrop', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LockCustProp: 'LockCustProp', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LockDelete: 'LockDelete', // @see {http://localhost/MS-VSDX.pdf#page=197}
    LockEnd: 'LockEnd', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockFormat: 'LockFormat', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockFromGroupFormat: 'LockFromGroupFormat', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockGroup: 'LockGroup', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockHeight: 'LockHeight', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockMoveX: 'LockMoveX', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockMoveY: 'LockMoveY', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockPreview: 'LockPreview', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockReplace: 'LockReplace', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockRotate: 'LockRotate', // @see {http://localhost/MS-VSDX.pdf#page=198}
    LockSelect: 'LockSelect', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockTextEdit: 'LockTextEdit', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockThemeColors: 'LockThemeColors', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockThemeConnectors: 'LockThemeConnectors', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockThemeEffects: 'LockThemeEffects', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockThemeFonts: 'LockThemeFonts', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockThemeIndex: 'LockThemeIndex', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockVariation: 'LockVariation', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockVtxEdit: 'LockVtxEdit', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LockWidth: 'LockWidth', // @see {http://localhost/MS-VSDX.pdf#page=199}
    LocPinX: 'LocPinX', // @see {http://localhost/MS-VSDX.pdf#page=200}
    LocPinY: 'LocPinY', // @see {http://localhost/MS-VSDX.pdf#page=200}
    Menu: 'Menu', // @see {http://localhost/MS-VSDX.pdf#page=200}
    Name: 'Name', // @see {http://localhost/MS-VSDX.pdf#page=200}
    NameUniv: 'NameUniv', // @see {http://localhost/MS-VSDX.pdf#page=200}
    NewWindow: 'NewWindow', // @see {http://localhost/MS-VSDX.pdf#page=200}
    NoAlignBox: 'NoAlignBox', // @see {http://localhost/MS-VSDX.pdf#page=200}
    NoCoauth: 'NoCoauth', // @see {http://localhost/MS-VSDX.pdf#page=200}
    NoCtlHandles: 'NoCtlHandles', // @see {http://localhost/MS-VSDX.pdf#page=200}
    NoFill: 'NoFill', // @see {http://localhost/MS-VSDX.pdf#page=200}
    NoLine: 'NoLine', // @see {http://localhost/MS-VSDX.pdf#page=201}
    NoLiveDynamics: 'NoLiveDynamics', // @see {http://localhost/MS-VSDX.pdf#page=201}
    NonPrinting: 'NonPrinting', // @see {http://localhost/MS-VSDX.pdf#page=201}
    NoObjHandles: 'NoObjHandles', // @see {http://localhost/MS-VSDX.pdf#page=201}
    NoProofing: 'NoProofing', // @see {http://localhost/MS-VSDX.pdf#page=201}
    NoQuickDrag: 'NoQuickDrag', // @see {http://localhost/MS-VSDX.pdf#page=201}
    NoShow: 'NoShow', // @see {http://localhost/MS-VSDX.pdf#page=201}
    NoSnap: 'NoSnap', // @see {http://localhost/MS-VSDX.pdf#page=201}
    ObjectKind: 'ObjectKind', // @see {http://localhost/MS-VSDX.pdf#page=201}
    ObjType: 'ObjType', // @see {http://localhost/MS-VSDX.pdf#page=202}
    OnPage: 'OnPage', // @see {http://localhost/MS-VSDX.pdf#page=202}
    OutputFormat: 'OutputFormat', // @see {http://localhost/MS-VSDX.pdf#page=202}
    Overline: 'Overline', // @see {http://localhost/MS-VSDX.pdf#page=202}
    PageBottomMargin: 'PageBottomMargin', // @see {http://localhost/MS-VSDX.pdf#page=202}
    PageHeight: 'PageHeight', // @see {http://localhost/MS-VSDX.pdf#page=202}
    PageLeftMargin: 'PageLeftMargin', // @see {http://localhost/MS-VSDX.pdf#page=202}
    PageLineJumpDirX: 'PageLineJumpDirX', // @see {http://localhost/MS-VSDX.pdf#page=202}
    PageLineJumpDirY: 'PageLineJumpDirY', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PageLockDuplicate: 'PageLockDuplicate', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PageLockReplace: 'PageLockReplace', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PageRightMargin: 'PageRightMargin', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PageScale: 'PageScale', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PageShapeSplit: 'PageShapeSplit', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PagesX: 'PagesX', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PagesY: 'PagesY', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PageTopMargin: 'PageTopMargin', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PageWidth: 'PageWidth', // @see {http://localhost/MS-VSDX.pdf#page=203}
    PaperKind: 'PaperKind', // @see {http://localhost/MS-VSDX.pdf#page=204}
    PaperSource: 'PaperSource', // @see {http://localhost/MS-VSDX.pdf#page=204}
    Perspective: 'Perspective', // @see {http://localhost/MS-VSDX.pdf#page=204}
    PinX: 'PinX', // @see {http://localhost/MS-VSDX.pdf#page=204}
    PinY: 'PinY', // @see {http://localhost/MS-VSDX.pdf#page=204}
    PlaceDepth: 'PlaceDepth', // @see {http://localhost/MS-VSDX.pdf#page=204}
    PlaceFlip: 'PlaceFlip', // @see {http://localhost/MS-VSDX.pdf#page=204}
    PlaceStyle: 'PlaceStyle', // @see {http://localhost/MS-VSDX.pdf#page=204}
    PlowCode: 'PlowCode', // @see {http://localhost/MS-VSDX.pdf#page=204}
    Pos: 'Pos', // @see {http://localhost/MS-VSDX.pdf#page=205}
    Position: 'Position', // @see {http://localhost/MS-VSDX.pdf#page=205}
    Position0: 'Position0', //TODO miky BRND page1.xml
    PreviewQuality: 'PreviewQuality', // @see {http://localhost/MS-VSDX.pdf#page=205}
    PreviewScope: 'PreviewScope', // @see {http://localhost/MS-VSDX.pdf#page=205}
    Print: 'Print', // @see {http://localhost/MS-VSDX.pdf#page=205}
    PrintGrid: 'PrintGrid', // @see {http://localhost/MS-VSDX.pdf#page=205}
    PrintPageOrientation: 'PrintPageOrientation', // @see {http://localhost/MS-VSDX.pdf#page=205}
    Prompt: 'Prompt', // @see {http://localhost/MS-VSDX.pdf#page=206}
    QuickStyleEffectsMatrix: 'QuickStyleEffectsMatrix', // @see {http://localhost/MS-VSDX.pdf#page=206}
    QuickStyleFillColor: 'QuickStyleFillColor', // @see {http://localhost/MS-VSDX.pdf#page=207}
    QuickStyleFillMatrix: 'QuickStyleFillMatrix', // @see {http://localhost/MS-VSDX.pdf#page=208}
    QuickStyleFontColor: 'QuickStyleFontColor', // @see {http://localhost/MS-VSDX.pdf#page=209}
    QuickStyleFontMatrix: 'QuickStyleFontMatrix', // @see {http://localhost/MS-VSDX.pdf#page=209}
    QuickStyleLineColor: 'QuickStyleLineColor', // @see {http://localhost/MS-VSDX.pdf#page=210}
    QuickStyleLineMatrix: 'QuickStyleLineMatrix', // @see {http://localhost/MS-VSDX.pdf#page=210}
    QuickStyleShadowColor: 'QuickStyleShadowColor', // @see {http://localhost/MS-VSDX.pdf#page=211}
    QuickStyleType: 'QuickStyleType', // @see {http://localhost/MS-VSDX.pdf#page=211}
    QuickStyleVariation: 'QuickStyleVariation', // @see {http://localhost/MS-VSDX.pdf#page=211}
    ReadOnly: 'ReadOnly', // @see {http://localhost/MS-VSDX.pdf#page=213}
    ReflectionBlur: 'ReflectionBlur', // @see {http://localhost/MS-VSDX.pdf#page=213}
    ReflectionDist: 'ReflectionDist', // @see {http://localhost/MS-VSDX.pdf#page=213}
    ReflectionSize: 'ReflectionSize', // @see {http://localhost/MS-VSDX.pdf#page=213}
    ReflectionTrans: 'ReflectionTrans', // @see {http://localhost/MS-VSDX.pdf#page=213}
    Relationships: 'Relationships', // @see {http://localhost/MS-VSDX.pdf#page=213}
    ReplaceCopyCells: 'ReplaceCopyCells', // @see {http://localhost/MS-VSDX.pdf#page=213}
    ReplaceLockFormat: 'ReplaceLockFormat', // @see {http://localhost/MS-VSDX.pdf#page=213}
    ReplaceLockShapeData: 'ReplaceLockShapeData', // @see {http://localhost/MS-VSDX.pdf#page=214}
    ReplaceLockText: 'ReplaceLockText', // @see {http://localhost/MS-VSDX.pdf#page=214}
    ResizeMode: 'ResizeMode', // @see {http://localhost/MS-VSDX.pdf#page=214}
    ResizePage: 'ResizePage', // @see {http://localhost/MS-VSDX.pdf#page=214}
    ReviewerID: 'ReviewerID', // @see {http://localhost/MS-VSDX.pdf#page=214}
    RightMargin: 'RightMargin', // @see {http://localhost/MS-VSDX.pdf#page=214}
    RotateGradientWithShape: 'RotateGradientWithShape', // @see {http://localhost/MS-VSDX.pdf#page=214}
    RotationType: 'RotationType', // @see {http://localhost/MS-VSDX.pdf#page=214}
    RotationXAngle: 'RotationXAngle', // @see {http://localhost/MS-VSDX.pdf#page=215}
    RotationYAngle: 'RotationYAngle', // @see {http://localhost/MS-VSDX.pdf#page=215}
    RotationZAngle: 'RotationZAngle', // @see {http://localhost/MS-VSDX.pdf#page=215}
    Rounding: 'Rounding', // @see {http://localhost/MS-VSDX.pdf#page=215}
    RouteStyle: 'RouteStyle', // @see {http://localhost/MS-VSDX.pdf#page=215}
    ScaleX: 'ScaleX', // @see {http://localhost/MS-VSDX.pdf#page=215}
    ScaleY: 'ScaleY', // @see {http://localhost/MS-VSDX.pdf#page=216}
    SelectMode: 'SelectMode', // @see {http://localhost/MS-VSDX.pdf#page=216}
    ShapeFixedCode: 'ShapeFixedCode', // @see {http://localhost/MS-VSDX.pdf#page=216}
    ShapeKeywords: 'ShapeKeywords', // @see {http://localhost/MS-VSDX.pdf#page=216}
    ShapePermeablePlace: 'ShapePermeablePlace', // @see {http://localhost/MS-VSDX.pdf#page=216}
    ShapePermeableX: 'ShapePermeableX', // @see {http://localhost/MS-VSDX.pdf#page=216}
    ShapePermeableY: 'ShapePermeableY', // @see {http://localhost/MS-VSDX.pdf#page=216}
    ShapePlaceFlip: 'ShapePlaceFlip', // @see {http://localhost/MS-VSDX.pdf#page=216}
    ShapePlaceStyle: 'ShapePlaceStyle', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapePlowCode: 'ShapePlowCode', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapeRouteStyle: 'ShapeRouteStyle', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapeShdwBlur: 'ShapeShdwBlur', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapeShdwObliqueAngle: 'ShapeShdwObliqueAngle', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapeShdwOffsetX: 'ShapeShdwOffsetX', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapeShdwOffsetY: 'ShapeShdwOffsetY', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapeShdwScaleFactor: 'ShapeShdwScaleFactor', // @see {http://localhost/MS-VSDX.pdf#page=217}
    ShapeShdwShow: 'ShapeShdwShow', // @see {http://localhost/MS-VSDX.pdf#page=218}
    ShapeShdwType: 'ShapeShdwType', // @see {http://localhost/MS-VSDX.pdf#page=218}
    ShapeSplit: 'ShapeSplit', // @see {http://localhost/MS-VSDX.pdf#page=218}
    ShapeSplittable: 'ShapeSplittable', // @see {http://localhost/MS-VSDX.pdf#page=218}
    Sharpen: 'Sharpen', // @see {http://localhost/MS-VSDX.pdf#page=218}
    ShdwBkgnd: 'ShdwBkgnd', //TODO miky FIGS page1.xml
    ShdwBkgndTrans: 'ShdwBkgndTrans', //TODO miky FIGS page1.xml
    ShdwForegnd: 'ShdwForegnd', // @see {http://localhost/MS-VSDX.pdf#page=219}
    ShdwForegndTrans: 'ShdwForegndTrans', // @see {http://localhost/MS-VSDX.pdf#page=219}
    ShdwObliqueAngle: 'ShdwObliqueAngle', // @see {http://localhost/MS-VSDX.pdf#page=219}
    ShdwOffsetX: 'ShdwOffsetX', // @see {http://localhost/MS-VSDX.pdf#page=219}
    ShdwOffsetY: 'ShdwOffsetY', // @see {http://localhost/MS-VSDX.pdf#page=219}
    ShdwPattern: 'ShdwPattern', // @see {http://localhost/MS-VSDX.pdf#page=220}
    ShdwScaleFactor: 'ShdwScaleFactor', // @see {http://localhost/MS-VSDX.pdf#page=220}
    ShdwType: 'ShdwType', // @see {http://localhost/MS-VSDX.pdf#page=220}
    Size: 'Size', // @see {http://localhost/MS-VSDX.pdf#page=220}
    SketchAmount: 'SketchAmount', // @see {http://localhost/MS-VSDX.pdf#page=220}
    SketchEnabled: 'SketchEnabled', // @see {http://localhost/MS-VSDX.pdf#page=221}
    SketchFillChange: 'SketchFillChange', // @see {http://localhost/MS-VSDX.pdf#page=221}
    SketchLineChange: 'SketchLineChange', // @see {http://localhost/MS-VSDX.pdf#page=221}
    SketchLineWeight: 'SketchLineWeight', // @see {http://localhost/MS-VSDX.pdf#page=221}
    SketchSeed: 'SketchSeed', // @see {http://localhost/MS-VSDX.pdf#page=221}
    Snap: 'Snap', // @see {http://localhost/MS-VSDX.pdf#page=221}
    SoftEdgesSize: 'SoftEdgesSize', // @see {http://localhost/MS-VSDX.pdf#page=221}
    SortKey: 'SortKey', // @see {http://localhost/MS-VSDX.pdf#page=222}
    SpAfter: 'SpAfter', // @see {http://localhost/MS-VSDX.pdf#page=222}
    SpBefore: 'SpBefore', // @see {http://localhost/MS-VSDX.pdf#page=222}
    SpLine: 'SpLine', // @see {http://localhost/MS-VSDX.pdf#page=222}
    Status: 'Status', // @see {http://localhost/MS-VSDX.pdf#page=222}
    Strikethru: 'Strikethru', // @see {http://localhost/MS-VSDX.pdf#page=222}
    Style: 'Style', // @see {http://localhost/MS-VSDX.pdf#page=222}
    SubAddress: 'SubAddress', // @see {http://localhost/MS-VSDX.pdf#page=223}
    TagName: 'TagName', // @see {http://localhost/MS-VSDX.pdf#page=223}
    TextBkgnd: 'TextBkgnd', // @see {http://localhost/MS-VSDX.pdf#page=223}
    TextBkgndTrans: 'TextBkgndTrans', // @see {http://localhost/MS-VSDX.pdf#page=223}
    TextDirection: 'TextDirection', // @see {http://localhost/MS-VSDX.pdf#page=224}
    TextPosAfterBullet: 'TextPosAfterBullet', // @see {http://localhost/MS-VSDX.pdf#page=224}
    TheData: 'TheData', // @see {http://localhost/MS-VSDX.pdf#page=224}
    ThemeIndex: 'ThemeIndex', // @see {http://localhost/MS-VSDX.pdf#page=224}
    TheText: 'TheText', // @see {http://localhost/MS-VSDX.pdf#page=224}
    TopMargin: 'TopMargin', // @see {http://localhost/MS-VSDX.pdf#page=224}
    Transparency: 'Transparency', // @see {http://localhost/MS-VSDX.pdf#page=224}
    TxtAngle: 'TxtAngle', // @see {http://localhost/MS-VSDX.pdf#page=225}
    TxtHeight: 'TxtHeight', // @see {http://localhost/MS-VSDX.pdf#page=225}
    TxtLocPinX: 'TxtLocPinX', // @see {http://localhost/MS-VSDX.pdf#page=225}
    TxtLocPinY: 'TxtLocPinY', // @see {http://localhost/MS-VSDX.pdf#page=225}
    TxtPinX: 'TxtPinX', // @see {http://localhost/MS-VSDX.pdf#page=225}
    TxtPinY: 'TxtPinY', // @see {http://localhost/MS-VSDX.pdf#page=225}
    TxtWidth: 'TxtWidth', // @see {http://localhost/MS-VSDX.pdf#page=225}
    Type: 'Type', // @see {http://localhost/MS-VSDX.pdf#page=225}
    UICat: 'UICat', // @see {http://localhost/MS-VSDX.pdf#page=226}
    UICod: 'UICod', // @see {http://localhost/MS-VSDX.pdf#page=226}
    UIFmt: 'UIFmt', // @see {http://localhost/MS-VSDX.pdf#page=226}
    UIVisibility: 'UIVisibility', // @see {http://localhost/MS-VSDX.pdf#page=226}
    UpdateAlignBox: 'UpdateAlignBox', // @see {http://localhost/MS-VSDX.pdf#page=226}
    UseGroupGradient: 'UseGroupGradient', // @see {http://localhost/MS-VSDX.pdf#page=226}
    Value: 'Value', // @see {http://localhost/MS-VSDX.pdf#page=226}
    VariationColorIndex: 'VariationColorIndex', // @see {http://localhost/MS-VSDX.pdf#page=226}
    VariationStyleIndex: 'VariationStyleIndex', // @see {http://localhost/MS-VSDX.pdf#page=227}
    Verify: 'Verify', // @see {http://localhost/MS-VSDX.pdf#page=228}
    VerticalAlign: 'VerticalAlign', // @see {http://localhost/MS-VSDX.pdf#page=228}
    ViewMarkup: 'ViewMarkup', // @see {http://localhost/MS-VSDX.pdf#page=228}
    Visible: 'Visible', // @see {http://localhost/MS-VSDX.pdf#page=228}
    WalkPreference: 'WalkPreference', // @see {http://localhost/MS-VSDX.pdf#page=228}
    Width: 'Width', // @see {http://localhost/MS-VSDX.pdf#page=229}
    X: 'X', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XCon: 'XCon', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XDyn: 'XDyn', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XGridDensity: 'XGridDensity', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XGridOrigin: 'XGridOrigin', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XGridSpacing: 'XGridSpacing', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XJustify: 'XJustify', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XRulerDensity: 'XRulerDensity', // @see {http://localhost/MS-VSDX.pdf#page=229}
    XRulerOrigin: 'XRulerOrigin', // @see {http://localhost/MS-VSDX.pdf#page=230}
    Y: 'Y', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YCon: 'YCon', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YDyn: 'YDyn', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YGridDensity: 'YGridDensity', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YGridOrigin: 'YGridOrigin', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YGridSpacing: 'YGridSpacing', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YJustify: 'YJustify', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YRulerDensity: 'YRulerDensity', // @see {http://localhost/MS-VSDX.pdf#page=230}
    YRulerOrigin: 'YRulerOrigin', // @see {http://localhost/MS-VSDX.pdf#page=231}
};

/** @enum {string} VisioShapeType */
export const VisioShapeType = {
    Shape: 'Shape',
    Group: 'Group',
    Foreign: 'Foreign',
    Guide: 'Guide',
    MasterShape1: 'MasterShape1', // in masters.xml
    MasterShape2: 'MasterShape2', // in master2.xml
    Dummy: 'Dummy', // created during import
    LinkLabel: 'LinkLabel',
};

/** @enum {string} VisioSectionType */
export const VisioSectionType = {
    Actions: 'Actions',
    ActionTag: 'ActionTag',
    Character: 'Character',
    Connection: 'Connection',
    Control: 'Control',
    Field: 'Field',
    FillGradient: 'FillGradient',
    Geometry: 'Geometry',
    Hyperlink: 'Hyperlink',
    Layer: 'Layer',
    LineGradient: 'LineGradient',
    Paragraph: 'Paragraph',
    User: 'User',
    Property: 'Property',
    Scratch: 'Scratch',
    Tabs: 'Tabs',

    // TODO: unimplemented
    // ConnectionABCD: 'ConnectionABCD',
    // Reviewer: 'Reviewer',
    // Annotation: 'Annotation',
};

/** @enum {string} VisioJxonRowAttributeName */
export const VisioJxonRowAttributeName = {
    Type: '@T',
    Name: '@N',
    UniqueIndex: '@IX',
    Deleted: '@Del',
};

/** @enum {string} VisioRowStructureType */
export const VisioRowStructureType = {
    Indexed: 'Indexed',
    Named: 'Named',
};

/** @enum {string} VisioRowType */
export const VisioRowType = {
    ArcTo: 'ArcTo',
    Ellipse: 'Ellipse',
    EllipticalArcTo: 'EllipticalArcTo',
    InfiniteLine: 'InfiniteLine',
    LineTo: 'LineTo',
    MoveTo: 'MoveTo',
    NURBSTo: 'NURBSTo',
    PolylineTo: 'PolylineTo',
    RelCubBezTo: 'RelCubBezTo',
    RelEllipticalArcTo: 'RelEllipticalArcTo',
    RelLineTo: 'RelLineTo',
    RelMoveTo: 'RelMoveTo',
    RelQuadBezTo: 'RelQuadBezTo',
    SplineStart: 'SplineStart',
    SplineKnot: 'SplineKnot',
};

export const VisioRowKey = {
    cells: 'cells',
    debugType: 'debugType',
    index: 'index'
}

/** @enum {string} VisioGeometryName */
export const VisioGeometryName = {
    Ellipse: 'Ellipse',
    RelMoveTo: 'RelMoveTo',
    RelLineTo: 'RelLineTo',
};

/** @enum {string} VisioTokenGroup - 2.5.7 Custom Token Groupings */
export const VisioTokenGroup = {
    vAngle: 'vAngle',
    vAny: 'vAny',
    vLength: 'vLength',
    vNum: 'vNum',
    vNumAny: 'vNumAny',
    vScalar: 'vScalar',
    vUnitType: 'vUnitType',
};

/** @enum {string} VisioShapeDebugType */
export const VisioShapeDebugType = {
    ShapeSimple: 'ShapeSimple',
    ShapeGroupItem: 'ShapeGroupItem',
    ShapeMaster: 'ShapeMaster',
    ShapeGroup: 'ShapeGroup',
    ShapeForeign: 'ShapeForeign',
    ShapeGuide: 'ShapeGuide',
    GeneralMaster: 'GeneralMaster', //TODO miky inconsistent
    ShapeDeleteOverride: 'ShapeDeleteOverride',
};

/** @enum {string} VisioAttribute (VisioObjectRootAttribute) */
export const VisioAttribute = {

    //TODO miky
    // to sort
    archive: 'archive',
    xmlPath: 'xmlPath',
    shapeId: 'shapeId',
    source: 'source',
    target: 'target',

    // _
    _rel: '_rel',

    // A
    alignName: 'alignName',

    // B
    baseID: 'baseID',
    base64: 'base64',
    background: 'background',
    backPage: 'backPage',
    beginX: 'beginX',
    beginY: 'beginY',

    // C
    cells: 'cells',
    colors: 'colors',
    connects: 'connects',

    // D
    deleted: 'deleted',
    defaultLineStyle: 'defaultLineStyle',
    defaultTextStyle: 'defaultTextStyle',
    defaultFillStyle: 'defaultFillStyle',
    defaultGuideStyle: 'defaultGuideStyle',
    documentSheet: 'documentSheet',
    documentSettings: 'documentSettings',
    dynamicGridEnabled: 'dynamicGridEnabled',

    // E
    endX: 'endX',
    endY: 'endY',

    // F
    faceNames: 'faceNames',
    fillStyle: 'fillStyle',
    foreignData: 'foreignData',
    foreignShapes: 'foreignShapes',
    fromSheet: 'fromSheet',
    fromCell: 'fromCell',
    fromPart: 'fromPart',

    // G
    glueSettings: 'glueSettings',

    // H
    hidden: 'hidden',

    // I
    icon: 'icon',
    iconSize: 'iconSize',
    iconUpdate: 'iconUpdate',
    id: 'id',
    index: 'index',
    isCustomNameU: 'isCustomNameU',
    isCustomName: 'isCustomName',

    // L
    lineStyle: 'lineStyle',

    // M
    master: 'master',
    masterId: 'masterId',
    masterShapeId: 'masterShapeId',
    masterShape: 'masterShape',
    masterType: 'masterType',
    matchByName: 'matchByName',

    // N
    name: 'name',
    nameU: 'nameU',
    n: 'n',

    // O
    originalId: 'originalId',

    // P
    pages: 'pages',
    pageSheet: 'pageSheet',
    patternFlags: 'patternFlags',
    prompt: 'prompt',
    protectStyles: 'protectStyles',
    protectShapes: 'protectShapes',
    protectMasters: 'protectMasters',
    protectBkgnds: 'protectBkgnds',

    // R
    rels: 'rels',
    relations: 'relations',
    relMasterShape: 'relMasterShape',
    rows: 'rows',

    // S
    shapes: 'shapes',
    shape: 'shape',
    sections: 'sections',
    snapSettings: 'snapSettings',
    snapExtensions: 'snapExtensions',
    snapAngles: 'snapAngles',
    styleSheets: 'styleSheets',

    // T
    text: 'text',
    textStyle: 'textStyle',
    topPage: 'topPage',
    toSheet: 'toSheet',
    toCell: 'toCell',
    toPart: 'toPart',
    type: 'type',

    // U
    uniqueId: 'uniqueId',

    // V
    val: 'val', // general value attribute
    viewScale: 'viewScale',
    viewCenterX: 'viewCenterX',
    viewCenterY: 'viewCenterY',

    // X
    xmlns: 'xmlns',
    'xmlns:r': 'xmlns:r',
    'xml:space': 'xml:space',

    // special
    jxon: 'jxon'
};

/**
 * @enum {string} VisioLinePattern
 * @see {http://localhost/MS-VSDX.pdf#page=195}
 */
export const VisioLinePattern = {
    //TODO miky is it used?
    0: 'transparent',
    1: 'solid',
    9: 'dashed',
    23: 'dotted',
};

/** @enum {string} VisioConvertType */
export const VisioConvertType = {
    ignore: 'ignore',
    number: 'number',
    booleanStrict: 'booleanStrict',
    booleanTriState: 'booleanTriState',
    color: 'color',
    asIs: 'asIs',
    byte: 'byte', // PtgByte @see {http://localhost/MS-VSDX.pdf#page=332&zoom=100,92,869}
    date: 'date',
    percentage: 'percentage',

    internalUnitsToPixels: 'internalUnitsToPixels',
    internalUnitsToDegrees: 'internalUnitsToDegrees',

    resolveByPath: 'resolveByPath', // different types dependent on xml structure
};

/** @enum {string} VisioXsdType */
export const VisioXsdType = {
    Shape_Type: 'Shape_Type',
    Master_Type: 'Master_Type',
    Section_Type: 'Section_Type',
    Row_Type: 'Row_Type',
};

/** @enum {string} VisioLogMessageType */
export const VisioLogMessageType = {
    Warning: 'Warning',
    Info: 'Info',
    Error: 'Error',
};

/** @enum {string} VisioValueType */
export const VisioValueType = {
    // PtgNum @see {http://localhost/MS-VSDX.pdf#page=337&zoom=100,92,677}
    // double precision floating-point number
    PtgNum: 'PtgNum',
    // PtgByte @see {http://localhost/MS-VSDX.pdf#page=332&zoom=100,92,869}
    //  an unsigned byte value
    PtgByte: 'PtgByte',

    // PtgBool @see {http://localhost/MS-VSDX.pdf#page=332&zoom=100,92,522}
    PtgBool: 'PtgBool',

    // PtgString @see {}
    PtgString: 'PtgString',


    // PtgColorRGB @see {}
    PtgColorRGB: 'PtgColorRGB',

    // PtgShort @see {}
    PtgShort: 'PtgShort',
    // PtgDate @see {}
    PtgDate: 'PtgDate',
    // PtgInt @see {}
    PtgInt: 'PtgInt',
    // PtgUnsShort @see {}
    PtgUnsShort: 'PtgUnsShort',
    // PtgNumI @see {}
    PtgNumI: 'PtgNumI',
    // vLanguageString @see {}
    vLanguageString: 'vLanguageString',
    // vFont @see {http://localhost/MS-VSDX.pdf#page=370&zoom=100,92,240}
    vFont: 'vFont',
    // vAny @see {}
    vAny: 'vAny',
    // vAngle @see {}
    vAngle: 'vAngle',

    // vScalar @see {http://localhost/MS-VSDX.pdf#page=360&zoom=100,92,273}
    vScalar: 'vScalar',

    // vLength @see {http://localhost/MS-VSDX.pdf#page=359&zoom=100,92,710}
    //  The value of any type in this
    // grouping MUST be interpreted as a lengthInternalUnitNumber.
    // http://localhost/MS-VSDX.pdf#page=360&zoom=100,92,734
    vLength: 'vLength',
    // vColor @see {}
    vColor: 'vColor',

    // vFormatString @see {http://localhost/MS-VSDX.pdf#page=370&zoom=100,92,318}
    vFormatString: 'vFormatString',

    formulaExpression: 'formulaExpression',
};

/** @enum {string} VisioValueJavascriptType */
export const VisioValueJavascriptType = {
    Number: 'Number',
    'String': 'String',
    StringToParse: 'StringToParse',

    Double: 'Double',
    BoolAsNnumber: 'BoolAsStringWithNnumber',
    Byte: 'Byte',
    Short: 'Short',
    Color: 'Color',
    Date: 'Date',
    Int: 'Int',
    Inches: 'Inches',
    NumberAsAString: 'NumberAsAString',
};

/** @enum {string} VisioThemeValKey */
export const VisioThemeValKey = {
    // A
    AccentColor: 'AccentColor',
    AccentColor2: 'AccentColor2',
    AccentColor3: 'AccentColor3',
    AccentColor4: 'AccentColor4',
    AccentColor5: 'AccentColor5',
    AccentColor6: 'AccentColor6',
    AsianFont: 'AsianFont',

    // B
    BackgroundColor: 'BackgroundColor',
    BevelTopType: 'BevelTopType',
    BevelTopWidth: 'BevelTopWidth',
    BevelTopHeight: 'BevelTopHeight',
    BevelMaterial: 'BevelMaterial',
    BevelLighting: 'BevelLighting',
    BevelLightingAngle: 'BevelLightingAngle',
    BevelContourColor: 'BevelContourColor',
    BevelContourSize: 'BevelContourSize',

    // C
    ComplexFont: 'ComplexFont',
    ConnectorColor: 'ConnectorColor',
    ConnectorPattern: 'ConnectorPattern',
    ConnectorWeight: 'ConnectorWeight',
    ConnectorTransparency: 'ConnectorTransparency',
    ConnectorRounding: 'ConnectorRounding',
    ConnectorBegin: 'ConnectorBegin',
    ConnectorEnd: 'ConnectorEnd',
    ConnectorBeginSize: 'ConnectorBeginSize',
    ConnectorEndSize: 'ConnectorEndSize',

    // D
    Dark: 'Dark',

    // F
    FillColor: 'FillColor',
    FillColor2: 'FillColor2',
    FillGradientEnabled: 'FillGradientEnabled',
    FillGradientDir: 'FillGradientDir',
    FillGradientAngle: 'FillGradientAngle',
    FillPattern: 'FillPattern',
    FillTransparency: 'FillTransparency',

    // G
    GlowSize: 'GlowSize',
    GlowColor: 'GlowColor',
    GlowTransparency: 'GlowTransparency',

    // H

    // L
    LatinFont: 'LatinFont',
    Light: 'Light',
    LineCap: 'LineCap',
    LineColor: 'LineColor',
    LineColorTrans: 'LineColorTrans',
    LineCompoundtype: 'LineCompoundtype',
    LineGradientEnabled: 'LineGradientEnabled',
    LineGradientDir: 'LineGradientDir',
    LineGradientAngle: 'LineGradientAngle',
    LinePattern: 'LinePattern',
    LineWeight: 'LineWeight',
    LineBegin: 'LineBegin',
    LineEnd: 'LineEnd',
    LineBeginSize: 'LineBeginSize',
    LineEndSize: 'LineEndSize',
    LineRounding: 'LineRounding',

    // R
    RotateGradientWithShape: 'RotateGradientWithShape',
    ReflectionBlur: 'ReflectionBlur',
    ReflectionDist: 'ReflectionDist',
    ReflectionSize: 'ReflectionSize',
    ReflectionTrans: 'ReflectionTrans',

    // S
    ShadowType: 'ShadowType',
    ShadowColor: 'ShadowColor',
    ShadowTransparency: 'ShadowTransparency',
    ShadowMagnification: 'ShadowMagnification',
    ShadowBlur: 'ShadowBlur',
    ShadowXOffset: 'ShadowXOffset',
    ShadowYOffset: 'ShadowYOffset',
    ShadowDirection: 'ShadowDirection',
    ShadowPattern: 'ShadowPattern',
    SoftEdgesSize: 'SoftEdgesSize',
    SketchAmount: 'SketchAmount',
    SketchEnabled: 'SketchEnabled',
    SketchFillChange: 'SketchFillChange',
    SketchLineChange: 'SketchLineChange',
    SketchLineWeight: 'SketchLineWeight',

    // T
    TextColor: 'TextColor',
    TextStyle: 'TextStyle',


    // U
    UseGroupGradient: 'UseGroupGradient',

    // V
    VariantColor1: 'VariantColor1',
    VariantColor2: 'VariantColor2',
    VariantColor3: 'VariantColor3',
    VariantColor4: 'VariantColor4',
    VariantColor5: 'VariantColor5',
    VariantColor6: 'VariantColor6',
    VariantColor7: 'VariantColor7',
};

/** @enum {string} VisioShapePart */
export const VisioShapePart = {
    fromNone: 'fromNone',      // visFromNone
    leftEdge: 'leftEdge',      // visLeftEdge
    centerEdge: 'centerEdge',  // visCenterEdge
    rightEdge: 'rightEdge',    // visRightEdge
    bottomEdge: 'bottomEdge',  // visBottomEdge
    middleEdge: 'middleEdge',  // visMiddleEdge
    topEdge: 'topEdge',        // visTopEdge
    beginX: 'beginX',          // visBeginX
    beginY: 'beginY',          // visBeginY
    begin: 'begin',            // visBegin
    endX: 'endX',              // visEndX
    endY: 'endY',              // visEndY
    end: 'end',                // visEnd
    fromPin: 'fromPin',        // visFromPin
    fromAngle: 'fromAngle',    // visFromAngle
};

export const VisioSectionStructureType = {
    Actions: VisioRowStructureType.Named,
    Character: VisioRowStructureType.Indexed,
    Connection: VisioRowStructureType.Indexed,
    Control: VisioRowStructureType.Named,
    Field: VisioRowStructureType.Indexed,
    FillGradient: VisioRowStructureType.Indexed,
    Geometry: VisioRowStructureType.Indexed,
    Hyperlink: VisioRowStructureType.Named,
    Layer: VisioRowStructureType.Indexed,
    LineGradient: VisioRowStructureType.Indexed,
    Paragraph: VisioRowStructureType.Indexed,
    Property: VisioRowStructureType.Named,
    Reviewer: VisioRowStructureType.Indexed,
    Scratch: VisioRowStructureType.Indexed,
    ActionTag: VisioRowStructureType.Named,
    Tabs: VisioRowStructureType.Indexed,
    User: VisioRowStructureType.Named,
}
