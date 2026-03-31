import { motion } from 'motion/react';
import Image from 'next/image';

export enum Platform {
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  MESSENGER = 'Messenger',
  WHATSAPP = 'WhatsApp',
  SMS = 'SMS',
  NATIVE = 'Native'
}

interface PlatformButtonProps {
  platform: Platform;
  disabled?: boolean;
  icon: string;
  handleShare: (platform: Platform) => Promise<void>;
}

const PlatformButton = ({
  platform,
  disabled,
  icon,
  handleShare
}: PlatformButtonProps): React.JSX.Element => {
  return (
    <motion.button
      type="button"
      onClick={(): Promise<void> => handleShare(platform)}
      disabled={disabled}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="flex flex-col items-center gap-3 rounded-2xl border-2 border-gray-200 p-4 !font-inter text-[#070707] shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Image src={icon} alt={platform} width={32} height={32} />
      <span className="text-[10px] text-[#51514F]">
        {platform === 'Native' ? 'More options' : platform}
      </span>
    </motion.button>
  );
};

export default PlatformButton;
