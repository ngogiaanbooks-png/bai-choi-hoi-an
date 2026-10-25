import { motion } from 'framer-motion';
import { useIsBack } from '../lib/hooks.js';

const EASE = [0.2, 0.7, 0.2, 1];

// Phần tử hiện ra khi cuộn tới: trồi 24px và rõ dần, lệch nhau theo `i` (70ms mỗi bậc), chạy một lần.
// Khi quay lại bằng nút Back thì hiện ngay.
export default function Reveal({ as = 'div', i = 0, y = 24, className, children, ...rest }) {
  const back = useIsBack();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={back ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.07 }}
      {...rest}
    >
      {children}
    </M>
  );
}
