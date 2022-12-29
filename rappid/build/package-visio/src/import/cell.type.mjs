import {
    VisioCellAttributeName,
    VisioConvertType,
    VisioXsdType,
    VisioSectionType,
    VisioRowType,
} from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';
import { assertPathStructure } from './assert/path.mjs';

/**
 * @param {VisioCellAttributeName} cellAttributeName
 * @param {VisioStructurePath} structurePath
 * @returns {VisioConvertType}
 */
export function getCellTypeByStructurePath(cellAttributeName, structurePath) {

    // ignore list -----------------------------------------------------------------------
    if ([
        VisioCellAttributeName.ShdwOffsetX,
        VisioCellAttributeName.ShdwOffsetY,
        VisioCellAttributeName.PageScale,
        VisioCellAttributeName.DrawingScale,
        VisioCellAttributeName.DrawingSizeType,
        VisioCellAttributeName.DrawingScaleType,
        VisioCellAttributeName.InhibitSnap,
        VisioCellAttributeName.PageLockReplace,
        VisioCellAttributeName.PageLockDuplicate,
        VisioCellAttributeName.UIVisibility,
        VisioCellAttributeName.ShdwType,
        VisioCellAttributeName.ShdwObliqueAngle,
        VisioCellAttributeName.ShdwScaleFactor,
        VisioCellAttributeName.DrawingResizeType,
        VisioCellAttributeName.PlaceDepth,
        VisioCellAttributeName.LineToNodeX,
        VisioCellAttributeName.LineToNodeY,
        VisioCellAttributeName.BlockSizeX,
        VisioCellAttributeName.BlockSizeY,
        VisioCellAttributeName.AvenueSizeX,
        VisioCellAttributeName.AvenueSizeY,
        VisioCellAttributeName.LineToLineX,
        VisioCellAttributeName.LineToLineY,
        VisioCellAttributeName.PageShapeSplit,

        VisioCellAttributeName.LayerMember,

        VisioCellAttributeName.PrintPageOrientation,
        VisioCellAttributeName.ColorSchemeIndex,
        VisioCellAttributeName.EffectSchemeIndex,
        VisioCellAttributeName.ConnectorSchemeIndex,
        VisioCellAttributeName.FontSchemeIndex,
        VisioCellAttributeName.ThemeIndex,
        VisioCellAttributeName.ShapeRouteStyle,
        VisioCellAttributeName.ConFixedCode,
        VisioCellAttributeName.ConLineRouteExt,

        VisioCellAttributeName.FlipX,
        VisioCellAttributeName.FlipY,
        VisioCellAttributeName.EventDblClick,
        VisioCellAttributeName.ShapeSplit,
        VisioCellAttributeName.ResizeMode,
        VisioCellAttributeName.TxtAngle,
        VisioCellAttributeName.LockHeight,
        VisioCellAttributeName.LockCalcWH,
        VisioCellAttributeName.HelpTopic,
        VisioCellAttributeName.Copyright,
        VisioCellAttributeName.NoAlignBox,
        VisioCellAttributeName.DynFeedback,
        VisioCellAttributeName.GlueType,
        VisioCellAttributeName.NoLiveDynamics,
        VisioCellAttributeName.ShapeSplittable,

        VisioCellAttributeName.SelectMode,
        VisioCellAttributeName.DisplayMode,
        VisioCellAttributeName.QuickStyleLineColor,
        VisioCellAttributeName.QuickStyleFontColor,
        VisioCellAttributeName.QuickStyleFillMatrix,
        VisioCellAttributeName.QuickStyleEffectsMatrix,
        VisioCellAttributeName.QuickStyleFontMatrix,
        VisioCellAttributeName.QuickStyleType,

        VisioCellAttributeName.BeginArrowSize,
        VisioCellAttributeName.EndArrowSize,

        VisioCellAttributeName.RouteStyle,
        VisioCellAttributeName.XRulerOrigin,
        VisioCellAttributeName.YRulerOrigin,
        VisioCellAttributeName.XGridOrigin,
        VisioCellAttributeName.YGridOrigin,
        VisioCellAttributeName.ImgOffsetX,
        VisioCellAttributeName.ImgOffsetY,
        VisioCellAttributeName.ImgWidth,
        VisioCellAttributeName.ImgHeight,
        VisioCellAttributeName.ClippingPath,
        VisioCellAttributeName.ShdwForegnd,
        VisioCellAttributeName.ShdwPattern,
        VisioCellAttributeName.ShdwForegndTrans,
        VisioCellAttributeName.ShapeShdwType,
        VisioCellAttributeName.ShapeShdwOffsetX,
        VisioCellAttributeName.ShapeShdwOffsetY,
        VisioCellAttributeName.ShapeShdwObliqueAngle,
        VisioCellAttributeName.ShapeShdwScaleFactor,

        VisioCellAttributeName.QuickStyleVariation,
        VisioCellAttributeName.Comment,
        VisioCellAttributeName.DefaultTabStop,
        VisioCellAttributeName.LockAspect,
        VisioCellAttributeName.LockGroup,
        VisioCellAttributeName.LineCap,
        VisioCellAttributeName.CompoundType,
        VisioCellAttributeName.ShapeShdwBlur,
        VisioCellAttributeName.ReflectionTrans,
        VisioCellAttributeName.ReflectionSize,
        VisioCellAttributeName.ReflectionDist,
        VisioCellAttributeName.ReflectionBlur,
        VisioCellAttributeName.GlowColor,
        VisioCellAttributeName.GlowColorTrans,
        VisioCellAttributeName.GlowSize,
        VisioCellAttributeName.SoftEdgesSize,
        VisioCellAttributeName.SketchSeed,
        VisioCellAttributeName.SketchEnabled,
        VisioCellAttributeName.SketchAmount,
        VisioCellAttributeName.SketchLineWeight,
        VisioCellAttributeName.SketchLineChange,
        VisioCellAttributeName.SketchFillChange,
        VisioCellAttributeName.BevelTopType,
        VisioCellAttributeName.BevelTopWidth,
        VisioCellAttributeName.BevelTopHeight,
        VisioCellAttributeName.BevelBottomType,
        VisioCellAttributeName.BevelBottomWidth,
        VisioCellAttributeName.BevelBottomHeight,
        VisioCellAttributeName.BevelDepthColor,
        VisioCellAttributeName.BevelDepthSize,
        VisioCellAttributeName.BevelContourColor,
        VisioCellAttributeName.BevelContourSize,
        VisioCellAttributeName.BevelMaterialType,
        VisioCellAttributeName.BevelLightingType,
        VisioCellAttributeName.BevelLightingAngle,
        VisioCellAttributeName.LineGradientDir,
        VisioCellAttributeName.LineGradientAngle,
        VisioCellAttributeName.LineGradientEnabled,
        VisioCellAttributeName.RotateGradientWithShape,

        VisioCellAttributeName.EnableLineProps,
        VisioCellAttributeName.EnableFillProps,
        VisioCellAttributeName.EnableTextProps,
        VisioCellAttributeName.HideForApply,
        VisioCellAttributeName.ShapeShdwShow,
        VisioCellAttributeName.TextDirection,
        VisioCellAttributeName.LockWidth,
        VisioCellAttributeName.LockMoveX,
        VisioCellAttributeName.LockMoveY,
        VisioCellAttributeName.LockDelete,
        VisioCellAttributeName.LockBegin,
        VisioCellAttributeName.LockEnd,
        VisioCellAttributeName.LockRotate,
        VisioCellAttributeName.LockCrop,
        VisioCellAttributeName.LockVtxEdit,
        VisioCellAttributeName.LockTextEdit,
        VisioCellAttributeName.LockFormat,
        VisioCellAttributeName.LockSelect,
        VisioCellAttributeName.LockCustProp,
        VisioCellAttributeName.LockFromGroupFormat,
        VisioCellAttributeName.LockThemeColors,
        VisioCellAttributeName.LockThemeEffects,
        VisioCellAttributeName.LockThemeConnectors,
        VisioCellAttributeName.LockThemeFonts,
        VisioCellAttributeName.LockThemeIndex,
        VisioCellAttributeName.LockVariation,
        VisioCellAttributeName.NoObjHandles,
        VisioCellAttributeName.NonPrinting,
        VisioCellAttributeName.NoCtlHandles,
        VisioCellAttributeName.UpdateAlignBox,
        VisioCellAttributeName.HideText,
        VisioCellAttributeName.WalkPreference,
        VisioCellAttributeName.IsDropSource,
        VisioCellAttributeName.LocalizeMerge,
        VisioCellAttributeName.NoProofing,
        VisioCellAttributeName.Calendar,
        VisioCellAttributeName.LangID,
        VisioCellAttributeName.DropOnPageScale,
        VisioCellAttributeName.TheData,
        VisioCellAttributeName.TheText,
        VisioCellAttributeName.EventXFMod,
        VisioCellAttributeName.EventDrop,
        VisioCellAttributeName.EventMultiDrop,
        VisioCellAttributeName.XRulerDensity,
        VisioCellAttributeName.YRulerDensity,
        VisioCellAttributeName.XGridDensity,
        VisioCellAttributeName.YGridDensity,
        VisioCellAttributeName.XGridSpacing,
        VisioCellAttributeName.YGridSpacing,
        VisioCellAttributeName.Gamma,
        VisioCellAttributeName.Contrast,
        VisioCellAttributeName.Brightness,
        VisioCellAttributeName.Sharpen,
        VisioCellAttributeName.Blur,
        VisioCellAttributeName.Denoise,
        VisioCellAttributeName.Transparency,
        VisioCellAttributeName.IsDropTarget,
        VisioCellAttributeName.IsSnapTarget,
        VisioCellAttributeName.IsTextEditTarget,
        VisioCellAttributeName.DontMoveChildren,
        VisioCellAttributeName.ShapePermeableX,
        VisioCellAttributeName.ShapePermeableY,
        VisioCellAttributeName.ShapePermeablePlace,
        VisioCellAttributeName.Relationships,
        VisioCellAttributeName.ShapeFixedCode,
        VisioCellAttributeName.ShapePlowCode,
        VisioCellAttributeName.ShapePlaceStyle,
        VisioCellAttributeName.ConLineJumpCode,
        VisioCellAttributeName.ConLineJumpStyle,
        VisioCellAttributeName.ConLineJumpDirX,
        VisioCellAttributeName.ConLineJumpDirY,
        VisioCellAttributeName.ShapePlaceFlip,
        VisioCellAttributeName.DisplayLevel,
        VisioCellAttributeName.ResizePage,
        VisioCellAttributeName.EnableGrid,
        VisioCellAttributeName.DynamicsOff,
        VisioCellAttributeName.CtrlAsInput,
        VisioCellAttributeName.AvoidPageBreaks,
        VisioCellAttributeName.PlaceStyle,
        VisioCellAttributeName.PlowCode,
        VisioCellAttributeName.LineJumpCode,
        VisioCellAttributeName.LineJumpStyle,
        VisioCellAttributeName.PageLineJumpDirX,
        VisioCellAttributeName.PageLineJumpDirY,
        VisioCellAttributeName.LineJumpFactorX,
        VisioCellAttributeName.LineJumpFactorY,
        VisioCellAttributeName.LineAdjustFrom,
        VisioCellAttributeName.LineAdjustTo,
        VisioCellAttributeName.PlaceFlip,
        VisioCellAttributeName.LineRouteExt,
        VisioCellAttributeName.PageLeftMargin,
        VisioCellAttributeName.PageRightMargin,
        VisioCellAttributeName.PageTopMargin,
        VisioCellAttributeName.PageBottomMargin,
        VisioCellAttributeName.ScaleX,
        VisioCellAttributeName.ScaleY,
        VisioCellAttributeName.PagesX,
        VisioCellAttributeName.PagesY,
        VisioCellAttributeName.CenterX,
        VisioCellAttributeName.CenterY,
        VisioCellAttributeName.OnPage,
        VisioCellAttributeName.PrintGrid,
        VisioCellAttributeName.PaperKind,
        VisioCellAttributeName.PaperSource,
        VisioCellAttributeName.QuickStyleShadowColor,
        VisioCellAttributeName.RotationXAngle,
        VisioCellAttributeName.RotationYAngle,
        VisioCellAttributeName.RotationZAngle,
        VisioCellAttributeName.RotationType,
        VisioCellAttributeName.Perspective,
        VisioCellAttributeName.DistanceFromGround,
        VisioCellAttributeName.KeepTextFlat,
        VisioCellAttributeName.VariationColorIndex,
        VisioCellAttributeName.VariationStyleIndex,
        VisioCellAttributeName.EmbellishmentIndex,
        VisioCellAttributeName.ReplaceLockShapeData,
        VisioCellAttributeName.ReplaceLockText,
        VisioCellAttributeName.ReplaceLockFormat,
        VisioCellAttributeName.ReplaceCopyCells,
        VisioCellAttributeName.OutputFormat,
        VisioCellAttributeName.LockPreview,
        VisioCellAttributeName.AddMarkup,
        VisioCellAttributeName.ViewMarkup,
        VisioCellAttributeName.DocLockReplace,
        VisioCellAttributeName.NoCoauth,
        VisioCellAttributeName.DocLockDuplicatePage,
        VisioCellAttributeName.PreviewQuality,
        VisioCellAttributeName.PreviewScope,
        VisioCellAttributeName.ShapeKeywords,
    ].includes(cellAttributeName))
        return VisioConvertType.ignore;

    // as number -------------------------------------------------------------------------

    if ([
        VisioCellAttributeName.BeginArrow, // strokeBeginArrow
        VisioCellAttributeName.EndArrow, // strokeEndArrow
        VisioCellAttributeName.QuickStyleFillColor, // quickStyleFillColor
        VisioCellAttributeName.QuickStyleLineMatrix, // quickStyleLineMatrix

        VisioCellAttributeName.ObjType, //TODO miky resolve as something better than number

        VisioCellAttributeName.LineColorTrans,
        VisioCellAttributeName.FillForegndTrans,
        VisioCellAttributeName.LinePattern,
        VisioCellAttributeName.FillPattern,
        VisioCellAttributeName.FillBkgndTrans,
        VisioCellAttributeName.TextBkgndTrans,

        VisioCellAttributeName.VerticalAlign, // Text align
        VisioCellAttributeName.HorzAlign, // Paragraph align
        VisioCellAttributeName.Style, // Character style

        VisioCellAttributeName.FillGradientDir,

    ].includes(cellAttributeName))
        return VisioConvertType.number;

    // as boolean ------------------------------------------------------------------------

    if ([
        VisioCellAttributeName.NoFill,
        VisioCellAttributeName.NoLine,
        VisioCellAttributeName.NoShow,
        VisioCellAttributeName.NoSnap,
        VisioCellAttributeName.NoQuickDrag,
        VisioCellAttributeName.LockReplace,
        VisioCellAttributeName.FillGradientEnabled,
        VisioCellAttributeName.UseGroupGradient,
    ].includes(cellAttributeName))
        return VisioConvertType.booleanStrict;

    // internal units --------------------------------------------------------------------

    if ([
        VisioCellAttributeName.PinX, // x
        VisioCellAttributeName.PinY, // y
        VisioCellAttributeName.LocPinX, // locX
        VisioCellAttributeName.LocPinY, // locY
        VisioCellAttributeName.Width, // width
        VisioCellAttributeName.Height, // height
        VisioCellAttributeName.Rounding, // strokeRadius
        VisioCellAttributeName.LineWeight, // strokeWeight
        VisioCellAttributeName.BeginX, // beginX
        VisioCellAttributeName.BeginY, // beginY
        VisioCellAttributeName.EndX, // endX
        VisioCellAttributeName.EndY, // endY
        VisioCellAttributeName.PageWidth, // pageWidth
        VisioCellAttributeName.PageHeight, // pageHeight

        VisioCellAttributeName.TxtPinX,
        VisioCellAttributeName.TxtPinY,
        VisioCellAttributeName.TxtWidth,
        VisioCellAttributeName.TxtHeight,
        VisioCellAttributeName.TxtLocPinX,
        VisioCellAttributeName.TxtLocPinY,
        VisioCellAttributeName.LeftMargin,
        VisioCellAttributeName.RightMargin,
        VisioCellAttributeName.TopMargin,
        VisioCellAttributeName.BottomMargin,
        VisioCellAttributeName.Size,

        // geometry
        VisioCellAttributeName.X,
        VisioCellAttributeName.Y,
        VisioCellAttributeName.A,
        VisioCellAttributeName.B,
        VisioCellAttributeName.D,

    ].includes(cellAttributeName))
        return VisioConvertType.internalUnitsToPixels;

    if ([
        VisioCellAttributeName.Angle, // rotate
        VisioCellAttributeName.FillGradientAngle,
    ].includes(cellAttributeName))
        return VisioConvertType.internalUnitsToDegrees;


    if ([
        VisioCellAttributeName.Color, // Character color
        VisioCellAttributeName.FillForegnd, // fill
        VisioCellAttributeName.LineColor, // stroke
        VisioCellAttributeName.FillBkgnd,
        VisioCellAttributeName.TextBkgnd
    ].includes(cellAttributeName))
        return VisioConvertType.color;

    // just value as is ------------------------------------------------------------------
    if ([
        VisioCellAttributeName.E, // Geometry Nurbs Formula

        VisioCellAttributeName.DocLangID,
    ].includes(cellAttributeName))
        return VisioConvertType.asIs;

    // byte ------------------------------------------------------------------------------
    if ([
        VisioCellAttributeName.BegTrigger,
        VisioCellAttributeName.EndTrigger,
    ].includes(cellAttributeName))
        return VisioConvertType.byte;

    // resolve by the path - different types dependent on th xml structure ---------------
    if ([
        VisioCellAttributeName.C,
    ].includes(cellAttributeName))
        return resolveByPath(cellAttributeName, structurePath);

    debug.log(
        `Unknown cell attribute "VisioCellAttributeName.${cellAttributeName}"`
    );
}

function resolveByPath(cellAttributeName, structurePath) {
    if (cellAttributeName === VisioCellAttributeName.C) {
        // @see {http://localhost/MS-VSDX.pdf#page=171&zoom=100,92,156}
        // The C cell is a vScalar, vAngle, vAny or vLength custom token grouping that
        // specifies a property of a shape according to the Row_Type of its parent
        // element. It MUST have a Row_Type parent element that has a Geometry
        // Section_Type or Scratch Section_Type parent element.
        assertPathStructure(
            structurePath,
            [
                { xsdType: VisioXsdType.Shape_Type },
                {
                    xsdType: VisioXsdType.Section_Type,
                    type: [
                        VisioSectionType.Geometry,
                        VisioSectionType.Scratch,
                    ]
                },
                { xsdType: VisioXsdType.Row_Type },
            ]);

        const sectionType = getFirstSectionType(structurePath);

        if (sectionType === VisioSectionType.Scratch)
            return VisioConvertType.asIs; //  vAny that is used during formula evaluation only

        const rowType = getFirstRowType(structurePath);

        switch (rowType) {
            case VisioRowType.Ellipse:
                // vLength
                return VisioConvertType.internalUnitsToPixels;
            case VisioRowType.EllipticalArcTo:
            case VisioRowType.RelEllipticalArcTo:
                // vAngle
                return VisioConvertType.internalUnitsToDegrees;
            case VisioRowType.NURBSTo:
            case VisioRowType.RelCubBezTo:
            case VisioRowType.SplineStart:
                // vScalar
                return VisioConvertType.number;
        }

        debug.log('Unknown resolve strategy for Cell value.');
    }
}

function getFirstSectionType(structurePath){
    return structurePath
        .find(fragment=> fragment.xsdType === VisioXsdType.Section_Type)
        .type;
}

function getFirstRowType(structurePath){
    return structurePath
        .find(fragment=> fragment.xsdType === VisioXsdType.Row_Type)
        .type;
}
