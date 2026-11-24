import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="wrap text-center py-[120px]">
      <span className="block text-[6rem] font-extrabold text-accent leading-none">404</span>
      <h1 className="text-[2rem] mt-4 mb-2">الصفحة دي مش موجودة</h1>
      <p className="text-muted mb-7">الرابط ده مش موجود أو اتنقل لمكان تاني.</p>
      <Link to="/" className="btn btn-primary">الرجوع للرئيسية</Link>
    </div>
  );
}
