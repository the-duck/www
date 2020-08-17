import { NowRequest, NowResponse } from '@vercel/node'
import { Octokit } from '@octokit/rest'
import atob from 'atob'

export default (req: NowRequest, res: NowResponse) => {
  let { GH_TOKEN } = process.env;
  
  const octokit = new Octokit({
    auth: GH_TOKEN,
  });
  
  octokit.repos.getContent({
    owner: "the-duck",
    repo: "databases",
    path: 'links.json',
  })
  .then(({ data }) => {
    let decodedData = JSON.parse(atob(data.content))
    res.status(200).json({
      status: 'ok',
      ...decodedData,
    })
  })
  .catch(error => {
    res.status(200).json({
      status: 'error',
      message: error.message,
    })
  })
};
