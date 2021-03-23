import React from 'react';
import useFirestore from './useFirestore';
import { motion } from 'framer-motion';

const PicGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images');

  return (
    <div>
      {docs && docs.map(doc => (
        <motion.div key={doc.id} 
          layout
          whileHover={{ opacity: 1 }}
          onClick={() => setSelectedImg(doc.url)}
        >
          <motion.img src={doc.url} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default PicGrid;