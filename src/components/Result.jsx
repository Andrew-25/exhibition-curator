const Result = ({result}) => {
    if (result.systemNumber) {
        return (
            <div className="Result">
                <h3>{result['_primaryTitle']}</h3>
                <p>{result.objectType}</p>
                <img
                    src={result['_images']['_primary_thumbnail']}
                    alt={'alt'}
                />
                <p>Victoria and Albert</p>
            </div>
          );
    } else {
        return (
            <div className="Result">
                <h3>{result.attributes.description[0].value}</h3>
                <p>{result.attributes.category[0].name}</p>
                <img
                    src={`https://coimages.sciencemuseumgroup.org.uk/${result.attributes.multimedia[0]['@processed'].medium_thumbnail.location}`}
                    alt={result.attributes.description[0].value}
                />
                <p>Science museum group collection</p>
            </div>
          );
    }
}

export default Result