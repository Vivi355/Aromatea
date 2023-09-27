

const ReviewGraph = ({ reviews }) => {
    const frequencies = [0, 0, 0, 0, 0];

    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) frequencies[review.rating - 1]++;
    });

    const maxFrequency = Math.max(...frequencies);

    return (
        <div style={{ width: '100%', padding: '0 20px' }}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              style={{
                // marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                // padding: '5px 0',
              }}
            >
              <div style={{ marginRight: "10px", color: 'gray', flexBasis: '10px', textAlign: 'left' }}>
                {5 - index}
              </div>
              <div style={{
                flexGrow: 1,
                height: "2px",
                backgroundColor: "#e0e0e0",
                position: "relative",
                borderRadius: '10px',
              }}>
                <div
                  style={{
                    width: maxFrequency ? `${(frequencies[4 - index] / maxFrequency) * 100}%` : "0%",
                    height: "100%",
                    backgroundColor: "rgb(168,134,103)",
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div style={{ marginLeft: "180px", color: 'gray' }}></div>
            </div>
          ))}
        </div>
      );
    };



  export default ReviewGraph;
