import { Box, BoxProps, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";

const MotionBox = motion(Box);

const topVariants = {
  open: { rotate: 45, translateY: 8 },
  closed: { rotate: 0, translateY: 0 }
};

const middleVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 }
};

const bottomVariants = {
  open: { rotate: -45, translateY: -8 },
  closed: { rotate: 0, translateY: 0 }
};

interface AnimatedMenuProps extends BoxProps {
  isOpen: boolean;
}

const AnimatedMenu: FC<AnimatedMenuProps> = ({ isOpen, ...props }) => (
  <Stack gap={0.5} {...props}>
    <MotionBox
      w='24px'
      h='2px'
      bg='black'
      variants={topVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    />
    <MotionBox
      w='24px'
      h='2px'
      bg='black'
      my='4px'
      variants={middleVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    />
    <MotionBox
      w='24px'
      h='2px'
      bg='black'
      variants={bottomVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    />
  </Stack>
);

export default AnimatedMenu;
