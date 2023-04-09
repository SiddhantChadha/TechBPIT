export async function GET_ALL_POSTS() {
    try {
      const response = await fetch(
        '',
        {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWRkMWRjNTA4NmY2ZmNhODU3NmYwMSIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY4MTA1MzczMywiZXhwIjoxNjgxMDU0MzMzfQ.RHUo7PRunCmalP2Ytp7stR4Ziw1Xj46nHJo84NZUuf8',
          },
        },
        );
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
      console.log(error);
    }
  }