export const PictureItem = ({picture}) => {
   return (
      <div className="picture">
         <div>
            <p>{picture.id}</p>
            <p>{picture.title}</p>
         </div>
         <img src={picture.url} alt="example" loading="lazy" />
      </div>
   )
}