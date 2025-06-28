import { Button, Divider, Input, Textarea } from "@heroui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../store/AuthContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Tiptap from "./Tiptap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import { updateCard, type cardType } from "../Redux/CardSlice";
import { useNavigate } from "react-router-dom";

const CardInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  // console.log("Inside CardInfor: ", id);

  const [preview, setPreview] = useState<string>("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  if (!user || !id) {
    return <div>Card not found or user not logged in.</div>;
  }
  const card = useSelector((state: RootState) =>
    state.cards.find((c) => c.id === id)
  );

  useEffect(() => {
    // console.log("Use effect ran ");
    if (!user || !id) return;

    if (!card) {
      setTitle("");
      setDate("");
      setExcerpt("");
      setPreview("");
      setContent("");

      return;
    }

    if (card) {
      setTitle(card.title || "");
      setDate(card.date || "");
      setExcerpt(card.excerpt || "");
      setPreview(card.preview || "");
      setContent(card.content || "");
    }
  }, [id, user, card]);

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!user || !id) return;

    const newCardInfo: cardType = {
      id,
      title,
      date,
      excerpt,
      preview,
      content,
    };

    dispatch(updateCard(newCardInfo));

    toast.success("Card information saved successfully!");
  };
  const handleBack = () => {
    navigate("/Dashboard");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });
  return (
    <div className='flex flex-col bg-stone-200  items-center justify-center min-h-screen'>
      <header className="absolute top-1 left-8 z-10 flex gap-4'">
        <Button
          className=' mb-8 hover:bg-teal-500 hover:text-white hover:border-0  transition-all mt-4 bg-stone-200 text-teal-400 border-teal-400 border-2  '
          variant='bordered'
          //color='secondary'
          size='lg'
          radius='lg'
          fullWidth
          onPress={handleBack}
        >
          back
        </Button>
      </header>
      <div className='flex bg-white justify-center rounded-3xl shadow-lg overflow-hidden max-w-5xl w-full mt-6 mb-6'>
        <form className='flex flex-col justify-center p-12 w-2/3'>
          <div className='flex flex-col  mt-4'>
            <h3>Title</h3>
            <Textarea
              className='max-w-xs '
              isRequired
              fullWidth={true}
              variant='faded'
              maxRows={1}
              value={title}
              onValueChange={setTitle}
            />
            <Divider className='mt-5 mb-2' />
            <div className='mt-4 '>
              <h3>Date</h3>
              <Input
                type='date'
                className='max-w-xs'
                isRequired
                variant='faded'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <Divider className='mt-5 mb-2' />
            <div className='mt-4'>
              <h3>Excerpt</h3>
              <Textarea
                className='max-w '
                fullWidth={true}
                variant='faded'
                maxRows={3}
                value={excerpt}
                onValueChange={setExcerpt}
              />
            </div>
            <Divider className='mt-6 mb-2' />
            <h3 className='mt-4'>Upload Cover Image</h3>
            <div
              {...getRootProps()}
              className='border-2 size-lg border-dashed border-teal-300 p-2 rounded cursor-pointer text-center mt-2'
            >
              <input {...getInputProps()} />
              <p>Drop Image Here</p>
              {preview && (
                <img
                  src={preview}
                  alt='Uploaded'
                  className='mt-4 w-20 h-20 object-cover mx-auto rounded '
                />
              )}
            </div>
            <Divider className='mt-6 mb-2 ' />
            <div>
              <h3 className='mt-4 mb-2'>Content</h3>
              <Tiptap value={content} onChange={setContent} />
            </div>
            <Button
              variant='bordered'
              //color='primary'
              className=' bg-white text-teal-400 border-teal-400 border-2 hover:bg-teal-400 hover:border-teal-400 hover:text-white '
              size='lg'
              radius='lg'
              fullWidth
              onPress={handleSave}
            >
              Save Info
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CardInfo;
