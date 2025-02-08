import Image from "next/image";

function Home() {
  return (
    <div>
      <h1>O Thobias não sabe ligar a CDJ</h1>
      <Image
        src="/assets/thobias.gif"
        alt="Descrição do GIF"
        width={300}
        height={300}
        unoptimized
      />
      <div>
        <h1>O curupira sabe!</h1>
        <Image
          src="/assets/edilson.gif"
          alt="Descrição do GIF"
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <div>
        <h1>Trabalhe enquanto eles dormem...</h1>
        <Image
          src="/assets/cardoso.jpeg"
          alt="Descrição do GIF"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}

export default Home;
