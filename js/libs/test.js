//=============================================================================
// NYARURU'S PHYSICS ENGINE
//=============================================================================
function PhysicsASM(stdlib, foreign, heap) {
	"use asm"
	var HEAP = new stdlib.Float64Array(heap);
	function vectorProduct(x1, y1, x2, y2) {
		x1 = +x1; y1 = +y1; x2 = +x2; y2 = +y2;
		return +(+(x1 * y2) - +(x2 * y1));
	}
	function basePointVectorProduct(bx, by, x1, y1, x2, y2) {
		bx = +bx; by = +by; x1 = +x1; y1 = +y1; x2 = +x2; y2 = +y2;
		return +vectorProduct(+(x1 - bx), +(y1 - by), +(x2 - bx), +(y2 - by));
	}		
	function pointBigger(x1, y1, x2, y2) {
		x1 = +x1; y1 = +y1; x2 = +x2; y2 = +y2;
		if(x1 > x2) { return 1; }
		if(+x1 == +x2) {
			if(y1 > y2) {
				return 1;
			}
			if(+y1 == +y2) {
				return 2;
			}
		}
		return 0;
	}
	function isSegmentIntersect(p1x1, p1y1, p1x2, p1y2, p2x1, p2y1, p2x2, p2y2) {
		p1x1 = +p1x1;
		p1y1 = +p1y1;
		p1x2 = +p1x2;
		p1y2 = +p1y2;
		p2x1 = +p2x1;
		p2y1 = +p2y1;
		p2x2 = +p2x2;
		p2y2 = +p2y2;
		var pd1 = 0.0; var pd2 = 0.0; var pd3 = 0.0; var pd4 = 0.0;
		var c1 = 0.0; var c2 = 0.0;
		var b1 = 0; var b2 = 0; var b3 = 0; var b4 = 0;
		pd1 = +basePointVectorProduct(p1x1, p1y1, p1x2, p1y2, p2x1, p2y1);
		pd2 = +basePointVectorProduct(p1x1, p1y1, p1x2, p1y2, p2x2, p2y2);
		pd3 = +basePointVectorProduct(p2x1, p2y1, p2x2, p2y2, p1x1, p1y1);
		pd4 = +basePointVectorProduct(p2x1, p2y1, p2x2, p2y2, p1x2, p1y2);
		c1 = +(pd1 * pd2);
		c2 = +(pd3 * pd4);
		if(c1 > 0.0 | c2 > 0.0) {
			return 0;
		}
		else if(c1 < 0.0 & c2 < 0.0) {
			return 1;
		}
		else if(pd1 == 0.0 & pd2 == 0.0 & pd3 == 0.0 & pd4 == 0.0) {
			b1 = pointBigger(p1x1, p1y1, p2x1, p2y1) | 0;
			b2 = pointBigger(p1x1, p1y1, p2x2, p2y2) | 0;
			if((b1|0) == 2 | (b2|0) == 2) {
				return 1;
			}
			if(b1 ^ b2) {
				return 1;
			}
			b3 = pointBigger(p1x2, p1y2, p2x1, p2y1) | 0;
			b4 = pointBigger(p1x2, p1y2, p2x2, p2y2) | 0;
			if((b3|0) == 2 | (b4|0) == 2) {
				return 1;
			}
			if(b3 ^ b4) {
				return 1;
			}
			return 0;
		}
		return 1;
	}
	function isRectOutBound(x1, y1, l1, t1, r1, b1, x2, y2, l2, t2, r2, b2) {
		x1 = +x1;
		y1 = +y1;
		l1 = +l1;
		t1 = +t1;
		r1 = +r1;
		b1 = +b1;
		x2 = +x2;
		y2 = +y2;
		l2 = +l2;
		t2 = +t2;
		r2 = +r2;
		b2 = +b2;
		var minX1 = 0.0; 
		var maxX1 = 0.0;
		var minY1 = 0.0;
		var maxY1 = 0.0;
		var minX2 = 0.0; 
		var maxX2 = 0.0;
		var minY2 = 0.0;
		var maxY2 = 0.0;
		minX1 = +(x1 - l1);
		maxX1 = +(x1 + r1 - 1.0);
		minY1 = +(y1 - t1);
		maxY1 = +(y1 + b1 - 1.0);
		minX2 = +(x2 - l2);
		maxX2 = +(x2 + r2 - 1.0);
		minY2 = +(y2 - t2);
		maxY2 = +(y2 + b2 - 1.0);
		return (minY1 > maxY2 | minY2 > maxY1 | minX1 > maxX2 | minX2 > maxX1) | 0;
	}
	function vtX(pos) {
		pos = pos | 0;
		var p = 0;
		p = pos << 3;
		return +HEAP[p >> 3];
	}
	function vtY(pos) {
		pos = pos | 0;
		var p = 0;
		p = (pos + 1) | 0;
		p = p << 3;
		return +HEAP[p >> 3];
	}
	function isPointInConvexPolygon(x, y, vt_start, vt_end) {
		x = +x;
		y = +y;
		vt_start = vt_start | 0;
		vt_end = vt_end | 0;
		var pd = 0.0, cx = 0.0, cy = 0.0, p = 0, q = 0, vt_init = 0;
		var px = 0.0, py = 0.0, pd1 = 0.0;
		vt_init = (vt_end - 2) | 0;
		cx = +vtX(vt_init);
		cy = +vtY(vt_init);
		for (p = vt_start, q = vt_end; (p|0) < (q|0); p = (p + 2)|0) {
			px = +vtX(p);
			py = +vtY(p);
			pd1 = +basePointVectorProduct(cx, cy, x, y, px, py);
			if(+(pd1 * pd) < 0.0) {
				return 0.0;
			}
			if(pd1 != 0.0) {
				pd = +pd1;
			}
			cx = +px;
			cy = +py;
		}
		return 1.0;
	}
	function isConvexPolygonContains(vt_start1, vt_end1, vt_start2, vt_end2) {
		vt_start1 = vt_start1 | 0;
		vt_end1 = vt_end1 | 0;
		vt_start2 = vt_start2 | 0;
		vt_end2 = vt_end2 | 0;
		var p = 0, q = 0, x = 0.0, y = 0.0, inPolygon = 0.0;
		for (p = vt_start1, q = vt_end1; (p|0) < (q|0); p = (p + 2)|0) {
			x = +vtX(p);
			y = +vtY(p);
			inPolygon = +isPointInConvexPolygon(x, y, vt_start2, vt_end2);
			if(inPolygon == 0.0) {
				return 0;
			}
		}
		return 1;
	}
	function isConvexPolygonIntersect(vt_start1, vt_end1, vt_start2, vt_end2) {
		vt_start1 = vt_start1 | 0;
		vt_end1 = vt_end1 | 0;
		vt_start2 = vt_start2 | 0;
		vt_end2 = vt_end2 | 0;
		var cx1 = 0.0, cy1 = 0.0, cx2 = 0.0, cy2 = 0.0, vt_init1 = 0, vt_init2 = 0, x1 = 0.0, y1 = 0.0, x2 = 0.0, y2 = 0.0;
		var p1 = 0, p2 = 0, q1 = 0, q2 = 0;
		if(isConvexPolygonContains(vt_start1, vt_end1, vt_start2, vt_end2) | 0) {
			return 1;
		}
		if(isConvexPolygonContains(vt_start2, vt_end2, vt_start1, vt_end1) | 0) {
			return 1;
		}
		vt_init1 = (vt_end1 - 2) | 0;
		vt_init2 = (vt_end2 - 2) | 0;
		cx1 = +vtX(vt_init1);
		cy1 = +vtY(vt_init1);
		for(p1 = vt_start1, q1 = vt_end1; (p1|0) < (q1|0); p1 = (p1 + 2)|0) {
			x1 = +vtX(p1);
			y1 = +vtY(p1);
			cx2 = +vtX(vt_init2);
			cy2 = +vtY(vt_init2);
			for(p2 = vt_start2, q2 = vt_end2; (p2|0) < (q2|0); p2 = (p2 + 2)|0) {
				x2 = +vtX(p2);
				y2 = +vtY(p2);
				if(isSegmentIntersect(cx1, cy1, x1, y1, cx2, cy2, x2, y2) | 0) {
					return 1;
				}
				cx2 = +x2;
				cy2 = +y2;
			}
			cx1 = +x1;
			cy1 = +y1;
		}
		return 0;
	}
	return {
		vectorProduct:vectorProduct
		, basePointVectorProduct:basePointVectorProduct
		, isSegmentIntersect:isSegmentIntersect
		, isRectOutBound:isRectOutBound
		, isConvexPolygonIntersect:isConvexPolygonIntersect
		, isPointInConvexPolygon:isPointInConvexPolygon
	}
}

window.physicsASMHeap = new ArrayBuffer(0x10000);
window.physicsASMHeap64 = new Float64Array(physicsASMHeap);
window.physicsASM = PhysicsASM(window, null, physicsASMHeap);