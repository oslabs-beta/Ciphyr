import React, { useState, useEffect } from "react";

export default function DashLoadingScreen() {
  return (
    <div className="justify-center items-center rounded-md p-4 mx-auto my-8 h-full">
      <div className="animate-pulse flex space-x-4">

        <div className="flex-1 space-y-6 py-4">
          <div className="h-2 bg-slate-600 rounded"></div>
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
