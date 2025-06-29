import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../store/AuthContext";
import { clearCards, deleteCard } from "../Redux/CardSlice";
import type { RootState } from "../Redux/Store";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { Card, CardHeader, CardBody } from "@heroui/react";

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../AceternityComponents/Slidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconPencilShare,
  IconPencilCheck,
  IconBrandTerraform,
} from "@tabler/icons-react";
import { cn } from "../utils/cn";

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout: contextLogout } = useAuth();
  const cards = useSelector((state: RootState) => state.cards);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className='h-5 w-5 text-neutral-700 dark:text-neutral-200' />
      ),
    },
    {
      label: "Published",
      href: "/",
      icon: (
        <IconPencilShare className='h-5 w-5 text-neutral-700 dark:text-neutral-200' />
      ),
      onClick: { handleLogout },
    },
    {
      label: "Draf",
      href: "/",
      icon: (
        <IconPencilCheck className='h-5 w-5 text-neutral-700 dark:text-neutral-200' />
      ),
      onClick: { handleLogout },
    },

    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className='h-5 w-5 text-neutral-700 dark:text-neutral-200' />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className='h-5 w-5 text-neutral-700 dark:text-neutral-200' />
      ),
      onClick: { handleLogout },
    },
  ];

  if (!user) {
    return <div className='text-center mt-20 text-lg'>User not logged in.</div>;
  }

  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden bg-gray-100 dark:bg-neutral-900"
      )}
    >
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className='justify-between gap-10 bg-teal-300'>
          <div className='flex-1 overflow-y-auto'>
            {sidebarOpen ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {sidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <SidebarLink
            link={{
              label: "Dishank Singh",
              href: "#",
              icon: (
                <img
                  src='https://assets.aceternity.com/manu.png'
                  className='h-7 w-7 rounded-full'
                  alt='Avatar'
                />
              ),
            }}
          />
        </SidebarBody>
      </Sidebar>

      <div className='flex-1 overflow-y-auto p-4'>
        <div className='flex justify-end gap-4 mb-4'>
          <Button
            color='success'
            className='bg-slate-100 text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:text-white'
            onPress={handleCard}
          >
            Create New
          </Button>
          <Button color='danger' variant='ghost' onPress={handleLogout}>
            Logout
          </Button>
        </div>

        <div className='flex flex-wrap gap-4'>
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
                className='relative max-w-xs transition duration-300 hover:-translate-y-1 hover:scale-105 ml-2'
              >
                <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                  <p className='text-large uppercase font-mono'>{card.title}</p>
                  <small className='text-default-500'>{card.date}</small>
                  <h4 className='text-medium'>{card.excerpt}</h4>
                </CardHeader>
                <CardBody className='py-2'>
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
                className='bg-white rounded-xl shadow-xl w-2/3 max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto'
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const expandedCard = cards.find(
                    (c) => c.id === expandedCardId
                  );
                  if (!expandedCard) return null;
                  return (
                    <>
                      <h2 className='text-2xl font-bold mb-2'>
                        {expandedCard.title}
                      </h2>
                      <p className='text-gray-500 text-sm mb-4 font-mono'>
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
                        className='prose max-w-full hover:bg-slate-100 hover:rounded-xl p-5 overflow-auto'
                        dangerouslySetInnerHTML={{
                          __html: expandedCard.content,
                        }}
                      />
                      <div className='flex justify-end gap-4 mt-6'>
                        <Button
                          className='bg-white text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:text-white'
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
    </div>
  );
};

const Logo = () => (
  <a
    href='#'
    className='z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
  >
    <div className='h-5 w-6 rounded' />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='font-medium text-black dark:text-white'
    >
      <IconBrandTerraform className='inline h-5 w-5 mr-2' /> Acet Labs
    </motion.span>
  </a>
);

const LogoIcon = () => (
  <a
    href='#'
    className='z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
  >
    <IconBrandTerraform className='h-7 w-10 border-1 rounded-md p-0.5 ' />
  </a>
);

export default Dashboard;
