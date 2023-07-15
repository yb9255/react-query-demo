import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface Props {
  email: string;
}

interface User {
  id: string;
  channelId: string;
}

const fetchUserByEmail = (email: string) =>
  axios.get(`http://localhost:4000/users/${email}`);

const fetchCoursesByChannelId = (channelId?: string) =>
  axios.get(`http://localhost:4000/channels/${channelId}`);

function DependentQueriesPage({ email }: Props) {
  const { data: user } = useQuery<AxiosResponse<User>>(["user", email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });

  return <div>DependentQueriesPage</div>;
}

export default DependentQueriesPage;
