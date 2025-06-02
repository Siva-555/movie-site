import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";


const NotFound = () => {
    const navigate = useNavigate();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/");  
  //   }, 2000);
  // }, [navigate]);
  return (
    <div className="w-screen h-screen bg-slate-300 py-20 flex justify-center items-center">
      <Card className=" max-w-lg w-3/4 shadow-xl">
        <CardHeader>
          <CardTitle>404 - Page Not Found</CardTitle>
          <CardDescription className="flex items-center">Redirecting to home... <Loader2 className="animate-spin size-5" /></CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default NotFound;
