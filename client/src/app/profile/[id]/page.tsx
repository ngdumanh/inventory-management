interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">User Profile</h1>
      <hr />
      <p>Profile ID: {params.id}</p>
    </div>
  );
}
