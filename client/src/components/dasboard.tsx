import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  roomId: string;
  userId: string;
};
export default function DashBoard() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const userID = data.userId;
    const roomID = data.roomId;
    navigate("/room", { state: { userID, roomID } });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 m-2"
      >
        <label htmlFor="roomId" className="text-lg font-bold">
          Room Name:
        </label>
        <input
          id="roomId"
          type="text"
          {...register("roomId")}
          required
          className="border-2 border-black p-2  max-w-sm rounded-xl"
        />

        <label htmlFor="userId" className="text-lg font-bold">
          username:
        </label>
        <input
          id="userId"
          type="text"
          {...register("userId")}
          required
          className="border-2 border-black p-2  max-w-sm rounded-xl"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4  w-24 rounded-xl"
        >
          Submit
        </button>
      </form>
    </>
  );
}
