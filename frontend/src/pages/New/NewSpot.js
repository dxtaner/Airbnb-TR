import React, { useState, useMemo } from "react";
import api from "../../services/api";
import camera from "../../assets/camera.svg";
import "./NewSpot.css";

export default function NewSpot({ history }) {
  const user_id = localStorage.getItem("user");
  if (!user_id) {
    history.push("/");
  }
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!thumbnail || !company || !techs) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: { user_id },
    });

    history.push("/dashboard");
  }

  return (
    <div className="new-spot-container">
      <form onSubmit={handleSubmit}>
        <label
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbnail ? "has-thumbnail" : ""}>
          <input
            type="file"
            onChange={(event) => setThumbnail(event.target.files[0])}
          />
          <img src={camera} alt="Thumbnail" />
        </label>

        <label htmlFor="company">Şirket Alanı Adı*</label>
        <input
          id="company"
          placeholder="Harika şirketiniz"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />

        <label htmlFor="techs">
          Teknolojiler *<span> (Virgülle ayrılmış)</span>
        </label>
        <input
          id="techs"
          placeholder="Hangi teknolojiler kullanılıyor?"
          value={techs}
          onChange={(event) => setTechs(event.target.value)}
        />

        <label htmlFor="price">
          Günlük Fiyat *<span> (Ücretsiz bırakmak için boş bırakın)</span>
        </label>
        <input
          id="price"
          placeholder="Günlük ne kadar ücret alınacak?"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <button type="submit" className="submit-button">
          Gönder
        </button>
      </form>
    </div>
  );
}
