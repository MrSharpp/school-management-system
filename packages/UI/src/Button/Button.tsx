import * as React from 'react';
// import ButtonUnstyled, {
//   buttonUnstyledClasses,
//   ButtonUnstyledProps,
// } from '@mui/base/ButtonUnstyled';
import MUIButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';

// import Stack from '@mui/material/Stack';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

interface Props extends ButtonProps {
  loading?: boolean;
}

export default function Button(props: Props) {
  return (
    <>
      <LoadingButton {...props}>Button</LoadingButton>
    </>
  );
}
