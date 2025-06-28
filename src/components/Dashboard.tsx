import { useState } from "react";
import { Button } from "@heroui/react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../store/AuthContext";
import { clearCards, deleteCard } from "../Redux/CardSlice";
import type { RootState } from "../Redux/Store";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout: contextLogout } = useAuth();
  const cards = useSelector((state: RootState) => state.cards);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleCard = () => {
    if (!user) return;
    const id = `${user.UserId}-${Date.now()}`;
    navigate(`/cardInfo/${id}`, { replace: true });
  };

  const handleLogout = () => {
    contextLogout();
    dispatch(clearCards());

    navigate("/", { replace: true });
  };

  const handleDelete = (
    e: React.MouseEvent | { stopPropagation: () => void } | any,
    id: string
  ) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    dispatch(deleteCard(id));
    toast.success("Card deleted");
  };

  if (!user) {
    return <div className='text-center mt-20 text-lg'>User not logged in.</div>;
  }

  return (
    <div className='relative min-h-screen bg-slate-100'>
      <div className='absolute top-6 right-8 z-10 flex gap-4'>
        <Button
          color='success'
          //  variant='ghost'
          className='place-content-around bg-slate-100 text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:border-teal-400 hover:text-white '
          onPress={handleCard}
        >
          Create New
        </Button>
        <Button color='danger' variant='ghost' onPress={handleLogout}>
          Logout
        </Button>
      </div>

      <div className='p-6 flex flex-wrap gap-4'>
        {cards.length === 0 ? (
          <p className='text-center text-xl w-full mt-20 text-teal-500'>
            No cards yet. Click "Create New" to add one.
          </p>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              isHoverable
              isPressable
              onPress={() => setExpandedCardId(card.id)}
              className=' relative max-w-xs transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 '
            >
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <p className='text-large uppercase font-mono  '>{card.title}</p>
                <small className='text-default-500'>{card.date}</small>
                <h4 className='font- text-medium'>{card.excerpt}</h4>
              </CardHeader>
              <CardBody className='overflow-visible py-2'>
                {card.preview && (
                  <img
                    src={card.preview}
                    alt='Preview'
                    className='rounded-xl w-full h-40 object-cover'
                  />
                )}
              </CardBody>
            </Card>
          ))
        )}
      </div>

      <AnimatePresence>
        {expandedCardId && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedCardId(null)}
          >
            <motion.div
              className='bg-white rounded-xl shadow-xl w-2/3 max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto '
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const expandedCard = cards.find((c) => c.id === expandedCardId);
                if (!expandedCard) return null;

                return (
                  <>
                    <h2 className='text-2xl font-bold mb-2  '>
                      {expandedCard.title}
                    </h2>
                    <p className='text-gray-500 text-sm mb-4 font-mono  '>
                      {expandedCard.date}
                    </p>
                    <h4 className='text-lg font-medium mb-4'>
                      {expandedCard.excerpt}
                    </h4>

                    {expandedCard.preview && (
                      <img
                        src={expandedCard.preview}
                        alt='Preview'
                        className='rounded-xl w-full h-60 object-cover mb-4'
                      />
                    )}

                    <div
                      className='prose max-w-full hover:bg-slate-100 hover:rounded-xl p-5 hover:transition-all overflow-auto'
                      dangerouslySetInnerHTML={{ __html: expandedCard.content }}
                    />

                    <div className='flex justify-end gap-4 mt-6'>
                      <Button
                        variant='bordered'
                        //color='primary'
                        className=' bg-white text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:border-teal-400 hover:text-white '
                        onPress={() => {
                          navigate(`/cardInfo/${expandedCard.id}`);
                          setExpandedCardId(null);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='ghost'
                        color='danger'
                        onPress={(e) => {
                          handleDelete(e, expandedCard.id);
                          setExpandedCardId(null);
                        }}
                      >
                        DEL
                      </Button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
