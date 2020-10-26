import { Dimensions, StyleSheet } from 'react-native';
import theme from './Theme';
import { withTheme } from 'react-native-paper';
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const cols = theme.AppColumns;
const cols2 = 2.6;
const mr = theme.AppMargin;
const wd = (SCREEN_WIDTH - 2 * mr) / cols - 2 * mr;
const wd2 = (SCREEN_WIDTH - 2 * mr) / cols2 - 2 * mr;
//image size{ width: ((width - 10) / cols - 10) / 4, height: ((width - 10) / cols - 10) / 4 }
// 2 photos per width
const AppStyle = StyleSheet.create({
  // const AppStyle = ({theme}) => StyleSheet.create({
  containerHeader: {
    ...StyleSheet.absoluteFill,
    paddingHorizontal: 5,
    marginTop: 55,
    backgroundColor: theme.colors.background,
  },
  container: {
    ...StyleSheet.absoluteFill,
    paddingHorizontal: theme.AppPadding,
    backgroundColor: theme.colors.background,
  },
  containerv: {
    flex: 1,
    marginHorizontal: 5,
  },
  surface: {
    backgroundColor: theme.colors.surface1,
    padding: 3,
    elevation: 10,
    borderRadius: theme.roundness * 1.5,
    width: wd,
    height: wd,
    margin: mr,
  },
  surface_image: {
    padding: 3,
    margin: mr,
    height: '85%',
    width: '45%',
    alignSelf: 'center',
    alignContent: 'center',
    resizeMode: 'contain',
  },
  Place_image: {
    padding: 1,
    width: wd * 0.53,
    height: wd * 0.53,
    margin: mr,
    alignSelf: 'center',
  },
  surface1: {
    backgroundColor: theme.colors.background,
    padding: theme.AppPadding,
    elevation: 10,
    borderRadius: theme.roundness * 1.5,
    width: wd,
    height: wd,
    margin: mr,
  },
  surfaceAdd: {
    backgroundColor: theme.colors.background,
    padding: theme.AppPadding,
    elevation: 10,
    borderRadius: theme.roundness * 1.5,
    width: wd2,
    height: wd2,
    margin: mr,
  },
  surfaceImage: {
    padding: 3,
    width: wd2 * .8,
    height: wd * .8,
    margin: mr,
    alignSelf: 'center',
    alignContent: 'center',
  },
  box: {
    marginHorizontal: 4 * mr,
    backgroundColor: theme.colors.surface1,
    elevation: 3,
    borderRadius: theme.roundness * 1.5,
    padding: theme.AppPadding,
  },
  boxMain: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 2 * mr,
    backgroundColor: theme.colors.primary,
    elevation: 3,
    borderRadius: theme.roundness * 1.5,
    padding: theme.AppPadding,
  },
  MainText: {
    // fontFamily: 'Futura-Light',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#434343',
  },
  content: {
    flex: 1,
    padding: 8,
    height: 2000,
  },
  head: {
    height: 0.2 * height,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 20,
    marginTop: 0,
  },
  headImage: {
    marginVertical: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: `${theme.colors.background}`,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontFamily: 'FallingSky',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
  Input: {
    height: 45,
    marginBottom: 10,
    borderRadius: theme.roundness,
    fontFamily: theme.fonts.light.fontFamily,
    fontWeight: theme.fonts.light.fontWeight,
  },
  headLine: {
    marginLeft: 10,
    fontFamily: theme.fonts.medium.fontFamily,
    fontWeight: theme.fonts.medium.fontWeight,
  },
  headLineBold: {
    ...theme.fonts.bold,
  },
  passwordContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
  },
});

export const AppSurface = (col, row, mrfactor) => {
  const rows = row ? row : col;
  const fac = mrfactor ? mrfactor : 2;
  const wd = (SCREEN_WIDTH - fac * mr) / col - fac * mr;
  const hi = (SCREEN_WIDTH - fac * mr) / rows - fac * mr;
  return ({
    backgroundColor: theme.colors.background,
    padding: theme.AppPadding,
    elevation: 3,
    borderRadius: theme.roundness * 1.5,
    width: wd,
    height: hi,
    margin: mr / (fac / 2),
  });
};

// export default withTheme(App_Style) => ({ theme }) => AppStyle({ theme });
export default AppStyle;
// export default App_Style => withTheme(AppStyle);
