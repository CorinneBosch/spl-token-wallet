// import Fab from '@material-ui/core/Fab';
// import { Brightness5Rounded, Brightness4Rounded } from '@material-ui/icons';

// export default function ThemeIndicator(isDark) {
//   const displayAlt = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
//   if (isDark) {
//     return (
//       <Fab size="small" aria-label={displayAlt}>
//         here <Brightness4Rounded />
//       </Fab>
//     );
//   } else {
//     return (
//       <Fab size="small" aria-label={displayAlt}>
//         <Brightness5Rounded />
//       </Fab>
//     );
//   }
// }

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function GetPreferredColorScheme() {
  const matches = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      <span>{`lightmode: ${matches ? 'dark' : 'light'}`}</span>;<br />
      <span>{`darkmode: ${matches}`}</span>;
    </div>
  );
}
