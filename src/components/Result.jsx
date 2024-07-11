const Result = ({result}) => {

    return (
        <div className="Result">
            <h2>{result.attributes.description[0].value}</h2>
            <p>{result.attributes.category[0].name}</p>
            <img
                src={`https://coimages.sciencemuseumgroup.org.uk/${result.attributes.multimedia[0]['@processed'].medium_thumbnail.location}`}
                alt={result.attributes.multimedia[0]['@processed'].small_thumbnail.location}
            />
        </div>
      );
}

export default Result