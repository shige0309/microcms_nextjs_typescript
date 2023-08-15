import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/libs/client";
import { Blog } from "src/pages";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blog",
      queries: { q: req.body.q },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
