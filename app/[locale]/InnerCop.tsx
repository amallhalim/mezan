export type userProps = {
  user: {
    name: string;
    age: number;
  };
};

export default function InnerCop({ user }: userProps) {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.age}</p>
    </div>
  );
}
